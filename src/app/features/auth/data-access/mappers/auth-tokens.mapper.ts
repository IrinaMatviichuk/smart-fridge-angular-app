import { AuthTokens } from '../../domain/auth-tokens.model';
import { LoginResponseDto } from '../dto/login-response.dto';

export const mapLoginResponseDtoToAuthTokens = (dto: LoginResponseDto): AuthTokens => {
  return {
    accessToken: dto.access,
    refreshToken: dto.refresh,
  };
};
