import {
  generateAccessToken,
  generateRefreshToken,
  verifyPassword,
} from '@/lib/auth';
import logger from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import { signInSchema } from '@/lib/validations/auth';
import { APIResponse } from '@/shared/types/api';
import { AuthError, LoginResponse } from '@/shared/types/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  let body: any;
  try {
    // Parse request body
    body = await request.json();

    // Validate input
    const validationResult = signInSchema.safeParse(body);
    if (!validationResult.success) {
      logger.warn('Validation failed');
      const response: APIResponse<never> = {
        success: false,
        message: 'Invalid data',
        timestamp: new Date().toISOString(),
        details: {
          validationErrors: validationResult.error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
      };
      return NextResponse.json(response, { status: 400 });
    }

    const { email, password } = validationResult.data;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        status: true,
        lastLoginAt: true,
      },
    });

    if (!user) {
      logger.warn('Sign-in attempt with non-existent email');
      const response: APIResponse<never> = {
        success: false,
        message: 'Invalid email or password',
        timestamp: new Date().toISOString(),
      };
      return NextResponse.json(response, { status: 401 });
    }

    // Check if user is active
    if (user.status !== 'active') {
      logger.warn('Sign-in attempt with inactive user');
      const response: APIResponse<never> = {
        success: false,
        message: 'Account has been deactivated',
        timestamp: new Date().toISOString(),
      };
      return NextResponse.json(response, { status: 401 });
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      logger.warn('Sign-in attempt with invalid password');
      const response: APIResponse<never> = {
        success: false,
        message: 'Invalid email or password',
        timestamp: new Date().toISOString(),
      };
      return NextResponse.json(response, { status: 401 });
    }

    // Update last login time
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Create session object
    const session = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    // Generate tokens
    const accessToken = generateAccessToken(session);
    const refreshToken = generateRefreshToken(session);

    logger.info('User signed in successfully');

    const response: APIResponse<LoginResponse> = {
      success: true,
      data: {
        session,
        accessToken,
        refreshToken,
      },
      timestamp: new Date().toISOString(),
    };

    // Create response with cookies
    const nextResponse = NextResponse.json(response, { status: 200 });

    // Set httpOnly cookies for security
    nextResponse.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60, // 15 minutes
      path: '/',
    });

    nextResponse.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return nextResponse;
  } catch (error) {
    logger.error('Sign-in error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      email: body?.email || 'unknown',
    });

    if (error instanceof AuthError) {
      const response: APIResponse<never> = {
        success: false,
        message: error.message,
        timestamp: new Date().toISOString(),
      };
      return NextResponse.json(response, { status: error.status || 500 });
    }

    const response: APIResponse<never> = {
      success: false,
      message: 'An error occurred during sign in',
      timestamp: new Date().toISOString(),
    };
    return NextResponse.json(response, { status: 500 });
  }
}
