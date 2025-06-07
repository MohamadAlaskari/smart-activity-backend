import {
  Controller,
  Get,
  Patch,
  Post,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserPreferencesService } from './user-preferences.service';
import { CreateUserPreferencesDto } from './dto/create-user-preferences.dto';
import { UpdateUserPreferencesDto } from './dto/update-user-preferences.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@ApiTags('User Preferences')
@Controller('user-preferences')
export class UserPreferencesController {
  constructor(private readonly preferencesService: UserPreferencesService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create user preferences' })
  @ApiQuery({ name: 'userId', required: true, description: 'UUID of the user' })
  @ApiResponse({ status: 201, description: 'Preferences created successfully' })
  create(
    @Query('userId') userId: string,
    @Body() dto: CreateUserPreferencesDto,
  ) {
    return this.preferencesService.create(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get preferences by user ID' })
  @ApiQuery({ name: 'userId', required: true })
  @ApiResponse({
    status: 200,
    description: 'Preferences retrieved successfully',
  })
  getByUserId(@Query('userId') userId: string) {
    return this.preferencesService.getByUserId(userId);
  }

  @Patch()
  @ApiOperation({ summary: 'Update preferences by user ID' })
  @ApiQuery({ name: 'userId', required: true })
  @ApiResponse({ status: 200, description: 'Preferences updated successfully' })
  update(
    @Query('userId') userId: string,
    @Body() dto: UpdateUserPreferencesDto,
  ) {
    return this.preferencesService.update(userId, dto);
  }
}
