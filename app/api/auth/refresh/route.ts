import { generateAccessToken, generateRefreshToken } from '@/lib/auth';
import { verifyToken } from '@/lib/jwt';
import logger from '@/lib/logger';
import { APIResponse } from '@/shared/types/api';
import { Session } from '@/shared/types/session';
import { NextRequest, NextResponse } from 'next/server';

interface RefreshTokenRequest {
  refreshToken: string;
}

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  session: Session;
}

/**
 * POST /api/auth/refresh
 * Refreshes the access token using a valid refresh token
 */
export async function POST(request: NextRequest) {
  try {
    const body: RefreshTokenRequest = await request.json();
    const { refreshToken } = body;

    if (!refreshToken) {
      logger.warn('Refresh token missing in request');
      const response: APIResponse<null> = {
        success: false,
        message: 'Refresh token is required',
        timestamp: new Date().toISOString(),
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Verify the refresh token
    if (!process.env.JWT_REFRESH_TOKEN_SECRET) {
      throw new Error('JWT_REFRESH_TOKEN_SECRET is not set');
    }

    let session: Session;
    try {
      session = await verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN_SECRET
      );
    } catch (error) {
      logger.warn('Invalid refresh token provided', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      const response: APIResponse<null> = {
        success: false,
        message: 'Invalid refresh token',
        timestamp: new Date().toISOString(),
      };
      return NextResponse.json(response, { status: 401 });
    }

    // Generate new tokens
    const newAccessToken = generateAccessToken(session);
    const newRefreshToken = generateRefreshToken(session);

    logger.info('Tokens refreshed successfully', { userId: session.id });

    const response: APIResponse<RefreshTokenResponse> = {
      success: true,
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        session,
      },
      timestamp: new Date().toISOString(),
    };

    // Create response with new cookies
    const nextResponse = NextResponse.json(response, { status: 200 });

    // Set new httpOnly cookies
    nextResponse.cookies.set('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60, // 15 minutes
      path: '/',
    });

    nextResponse.cookies.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return nextResponse;
  } catch (error) {
    logger.error('Token refresh error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    const response: APIResponse<null> = {
      success: false,
      message: 'Token refresh failed',
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 500 });
  }
}
