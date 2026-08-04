import { ProtectedTestResult } from '../../domain/protected-test-result.model';
import { ProtectedTestResponseDto } from '../dto/protected-test-response.dto';

export const mapProtectedTestResponseDtoToResult = (
  dto: ProtectedTestResponseDto,
): ProtectedTestResult => {
  return {
    message: dto.message,
    userEmail: dto.user,
  };
};
