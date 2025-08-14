import {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
} from '@/lib/auth';
import logger from '@/lib/logger';
import { prisma } from '@/lib/prisma';
import { signUpSchema } from '@/lib/validations/auth';
import { APIResponse } from '@/shared/types/api';
import { AuthError, SignUpResponse } from '@/shared/types/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate input
    const validationResult = signUpSchema.safeParse(body);
    if (!validationResult.success) {
      logger.warn('Validation failed');
      const response: APIResponse<never> = {
        success: false,
        message: 'Dữ liệu không hợp lệ',
        timestamp: new Date().toISOString(),
        details: {
          validationErrors: validationResult.error.issues.map((err: any) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
      };
      return NextResponse.json(response, { status: 400 });
    }

    const { name, email, password } = validationResult.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      logger.warn('User registration attempt with existing email');
      const response: APIResponse<never> = {
        success: false,
        message: 'Email đã được sử dụng',
        timestamp: new Date().toISOString(),
      };
      return NextResponse.json(response, { status: 409 });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        status: 'active',
      },
      select: {
        id: true,
        email: true,
        name: true,
        status: true,
        createdAt: true,
      },
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

    logger.info('User registered successfully');

    const response: APIResponse<SignUpResponse> = {
      success: true,
      data: {
        session,
        accessToken,
        refreshToken,
      },
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    logger.error('Sign-up error');

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
      message: 'Đã xảy ra lỗi trong quá trình đăng ký',
      timestamp: new Date().toISOString(),
    };
    return NextResponse.json(response, { status: 500 });
  }
}
