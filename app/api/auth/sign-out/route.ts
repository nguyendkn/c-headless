import logger from '@/lib/logger';
import { APIResponse } from '@/shared/types/api';
import { NextResponse } from 'next/server';

/**
 * POST /api/auth/sign-out
 * Signs out the user by clearing authentication cookies
 */
export async function POST() {
  try {
    logger.info('User sign-out initiated');

    const response: APIResponse<{ message: string }> = {
      success: true,
      data: {
        message: 'Successfully signed out',
      },
      timestamp: new Date().toISOString(),
    };

    // Create response
    const nextResponse = NextResponse.json(response, { status: 200 });

    // Clear httpOnly cookies by setting them with past expiration dates
    nextResponse.cookies.set('accessToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0), // Set to epoch time to clear
      path: '/',
    });

    nextResponse.cookies.set('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0), // Set to epoch time to clear
      path: '/',
    });

    logger.info('User signed out successfully');
    return nextResponse;
  } catch (error) {
    logger.error('Sign-out error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    const response: APIResponse<null> = {
      success: false,
      message: 'Sign-out failed',
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 500 });
  }
}
