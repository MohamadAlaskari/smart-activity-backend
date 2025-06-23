import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiBody,
    ApiOkResponse,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { HealthDataService } from './health-data.service';
import { CreateHealthDataDto } from './dto/create-health-data.dto';
import { HealthData } from './entities/health-data.entity';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('health-data')
@Controller('health-data')
export class HealthDataController {
    constructor(private readonly healthDataService: HealthDataService) {}

    @Post()
    @ApiOperation({ summary: 'Create health data' })
    @ApiBody({ type: CreateHealthDataDto })
    @ApiOkResponse({ type: HealthData })
    create(@Body() dto: CreateHealthDataDto, @CurrentUser() user: User) {
        return this.healthDataService.create(dto, user.id);
    }

    @Get('')
    @ApiOperation({
        summary: 'Get all health data entries for the current user',
    })
    @ApiOkResponse({
        description:
            'Array of health data entries (without User object, with userId)',
        type: Object, // Wenn du ein DTO willst, z. B. type: [HealthDataResponseDto]
        isArray: true,
    })
    async getMyHealthData(@CurrentUser() user: User) {
        return await this.healthDataService.findAllByUser(user.id);
    }
}

/*

    @Put(':id')
    @ApiOperation({ summary: 'Update health data' })
    @ApiBody({ type: CreateHealthDataDto })
    @ApiOkResponse({ type: HealthData })
    update(@Param('id') id: string, @Body() dto: CreateHealthDataDto) {
        return this.healthDataService.update(id, dto);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'Find all health data by user' })
    @ApiOkResponse({ type: [HealthData] })
    findAllByUser(@Param('userId') userId: string) {
        return this.healthDataService.findAllByUser(userId);
    }

    @Get('user/:userId/date')
    @ApiOperation({ summary: 'Find health data by user and date' })
    @ApiParam({ name: 'userId', type: String })
    @ApiOkResponse({ type: HealthData })
    findOneByUserAndDate(
        @Param('userId') userId: string,
        @Query('date') date: string,
    ) {
        return this.healthDataService.findOneByUserAndDate(userId, date);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete health data by ID' })
    delete(@Param('id') id: string) {
        return this.healthDataService.delete(id);
    }
        */
