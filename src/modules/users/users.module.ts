import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserPreferences } from '../user-preferences/entities/user-preferences.entity';
import { HealthData } from '../health-data/entities/health-data.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, UserPreferences, HealthData])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
