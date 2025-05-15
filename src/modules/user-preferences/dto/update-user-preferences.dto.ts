import { PartialType } from '@nestjs/swagger';
import { CreateUserPreferencesDto } from './create-user-preferences.dto';

export class UpdateUserPreferencesDto extends PartialType(
  CreateUserPreferencesDto,
) {}
