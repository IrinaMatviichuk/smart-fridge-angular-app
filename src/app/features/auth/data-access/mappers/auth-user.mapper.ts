import { AuthUser } from '../../domain/auth-user.model';
import { AuthUserDto } from '../dto/auth-user.dto';
import { RegisterResponseDto } from '../dto/register-response.dto';

type AuthUserSourceDto = AuthUserDto | RegisterResponseDto;

export const mapAuthUserDtoToAuthUser = (dto: AuthUserSourceDto): AuthUser => {
  return {
    id: dto.id,
    email: dto.email,
    createdAt: new Date(dto.created_at),
  };
};
