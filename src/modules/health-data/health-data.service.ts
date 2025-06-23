// src/modules/health-data/health-data.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HealthData } from './entities/health-data.entity';
import { CreateHealthDataDto } from './dto/create-health-data.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class HealthDataService {
    constructor(
        @InjectRepository(HealthData)
        private readonly healthDataRepository: Repository<HealthData>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(dto: CreateHealthDataDto, userId: string) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) throw new NotFoundException('User not found');

        const healthData = this.healthDataRepository.create({
            ...dto,
            user,
        });

        // **JETZT speichern!**
        const saved = await this.healthDataRepository.save(healthData);

        // Nur userId im Response zurückgeben
        const { user: userObj, ...rest } = saved;
        return { userId: userObj.id, ...rest };
    }

    async findAllByUser(userId: string): Promise<HealthData[]> {
        console.log(`Finding all health data for user: ${userId}`);
        return this.healthDataRepository.find({
            where: { user: { id: userId } },
            order: { date: 'DESC' },
        });
    }

    /*
    async update(id: string, dto: CreateHealthDataDto): Promise<HealthData> {
        const healthData = await this.healthDataRepository.findOne({
            where: { id },
        });
        if (!healthData) throw new NotFoundException('Health data not found');

        // Wenn userId gesetzt ist, User nachladen
        let user = healthData.user;
        if (dto.userId && dto.userId !== user.id) {
            user = await this.userRepository.findOne({
                where: { id: dto.userId },
            });
            if (!user) throw new NotFoundException('User not found');
        }

        Object.assign(healthData, { ...dto, user });
        return this.healthDataRepository.save(healthData);
    }
*/

    async findOneByUserAndDate(
        userId: string,
        date: string,
    ): Promise<HealthData | null> {
        return this.healthDataRepository.findOne({
            where: { user: { id: userId }, date },
        });
    }

    async delete(id: string): Promise<void> {
        const res = await this.healthDataRepository.delete(id);
        if (res.affected === 0)
            throw new NotFoundException('Health data not found');
    }
}
