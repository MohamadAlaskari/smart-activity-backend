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
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('User Preferences')
@Controller('user-preferences')
export class UserPreferencesController {
    constructor(private readonly preferencesService: UserPreferencesService) {}

    @Post()
    @ApiOperation({ summary: 'Create user preferences' })
    @ApiResponse({
        status: 201,
        description: 'Preferences created successfully',
    })
    create(@CurrentUser() user: User, @Body() dto: CreateUserPreferencesDto) {
        return this.preferencesService.create(user.id, dto);
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
    @ApiResponse({
        status: 200,
        description: 'Preferences updated successfully',
    })
    update(@CurrentUser() user: User, @Body() dto: UpdateUserPreferencesDto) {
        return this.preferencesService.update(user.id, dto);
    }
}
