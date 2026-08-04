import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseApiService } from '../../../core/api';
import { AuthCredentials } from '../domain/auth-credentials.model';
import { AuthTokens } from '../domain/auth-tokens.model';
import { AuthUser } from '../domain/auth-user.model';
import { ProtectedTestResult } from '../domain/protected-test-result.model';
import { AuthUserDto } from './dto/auth-user.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { ProtectedTestResponseDto } from './dto/protected-test-response.dto';
import { RefreshTokenRequestDto } from './dto/refresh-token-request.dto';
import { RefreshTokenResponseDto } from './dto/refresh-token-response.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { mapLoginResponseDtoToAuthTokens } from './mappers/auth-tokens.mapper';
import { mapAuthUserDtoToAuthUser } from './mappers/auth-user.mapper';
import { mapProtectedTestResponseDtoToResult } from './mappers/protected-test-result.mapper';

const AUTH_API_PATH = 'auth';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService extends BaseApiService {
  login(credentials: AuthCredentials): Observable<AuthTokens> {
    const request: LoginRequestDto = {
      email: credentials.email,
      password: credentials.password,
    };

    return this.postMapped<LoginRequestDto, LoginResponseDto, AuthTokens>(
      `${AUTH_API_PATH}/login/`,
      request,
      mapLoginResponseDtoToAuthTokens,
    );
  }

  register(credentials: AuthCredentials): Observable<AuthUser> {
    const request: RegisterRequestDto = {
      email: credentials.email,
      password: credentials.password,
    };

    return this.postMapped<RegisterRequestDto, RegisterResponseDto, AuthUser>(
      `${AUTH_API_PATH}/register/`,
      request,
      mapAuthUserDtoToAuthUser,
    );
  }

  getCurrentUser(): Observable<AuthUser> {
    return this.getMappedRequired<AuthUserDto, AuthUser>(
      `${AUTH_API_PATH}/me/`,
      mapAuthUserDtoToAuthUser,
    );
  }

  refreshAccessToken(refreshToken: string): Observable<string> {
    const request: RefreshTokenRequestDto = {
      refresh: refreshToken,
    };

    return this.postMapped<RefreshTokenRequestDto, RefreshTokenResponseDto, string>(
      `${AUTH_API_PATH}/token/refresh/`,
      request,
      ({ access }) => access,
    );
  }

  testProtectedEndpoint(): Observable<ProtectedTestResult> {
    return this.getMappedRequired<ProtectedTestResponseDto, ProtectedTestResult>(
      `${AUTH_API_PATH}/protected-test/`,
      mapProtectedTestResponseDtoToResult,
    );
  }
}
