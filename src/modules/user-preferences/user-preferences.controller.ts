import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserPreferencesService } from 'src/modules/user-preferences/user-preferences.service';
import { CreateUserPreferencesDto } from './dto/create-user-preferences.dto';
import { UpdateUserPreferencesDto } from './dto/update-user-preferences.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('User Preferences')
@Controller('preferences')
export class UserPreferencesController {
  constructor(private readonly preferencesService: UserPreferencesService) {}

  @Post(':userId')
  @ApiOperation({ summary: 'Create user preferences for a given user ID' })
  create(
    @Param('userId') userId: string,
    @Body() dto: CreateUserPreferencesDto,
  ) {
    return this.preferencesService.create(userId, dto);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get preferences by user ID' })
  findByUser(@Param('userId') userId: string) {
    return this.preferencesService.findByUser(userId);
  }

  @Patch(':userId')
  @ApiOperation({ summary: 'Update preferences by user ID' })
  update(
    @Param('userId') userId: string,
    @Body() dto: UpdateUserPreferencesDto,
  ) {
    return this.preferencesService.update(userId, dto);
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Delete preferences by user ID' })
  delete(@Param('userId') userId: string) {
    return this.preferencesService.delete(userId);
  }
}
