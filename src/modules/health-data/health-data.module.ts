// src/modules/health-data/health-data.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthData } from './entities/health-data.entity';

import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { HealthDataService } from './health-data.service';
import { HealthDataController } from './health-data.controller';

@Module({
    imports: [TypeOrmModule.forFeature([HealthData, User]), UsersModule],
    controllers: [HealthDataController],
    providers: [HealthDataService],
    exports: [HealthDataService],
})
export class HealthDataModule {}
