/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPreferences } from './entities/user-preferences.entity';
import { CreateUserPreferencesDto } from './dto/create-user-preferences.dto';
import { UpdateUserPreferencesDto } from './dto/update-user-preferences.dto';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class UserPreferencesService {
    constructor(
        @InjectRepository(UserPreferences)
        private readonly repo: Repository<UserPreferences>,

        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) {}

    private safeJsonParse(value: string): any {
        try {
            return value ? JSON.parse(value) : [];
        } catch {
            return [];
        }
    }

    async create(userId: string, dto: CreateUserPreferencesDto) {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found');

        const existing = await this.repo.findOne({
            where: { user: { id: userId } },
        });
        if (existing)
            throw new Error('Preferences already exist for this user');

        const newPrefs = this.repo.create({
            user,
            selectedVibes: JSON.stringify(dto.selectedVibes),
            selectedLifeVibes: JSON.stringify(dto.selectedLifeVibes),
            selectedExperienceTypes: JSON.stringify(
                dto.selectedExperienceTypes,
            ),
            selectedTimeWindows: JSON.stringify(dto.selectedTimeWindows),
            selectedGroupSizes: JSON.stringify(dto.selectedGroupSizes),
            budget: dto.budget,
            distanceRadius: dto.distanceRadius,
        });

        return this.repo.save(newPrefs);
    }

    async getByUserId(userId: string) {
        const prefs = await this.repo.findOne({
            where: { user: { id: userId } },
        });
        if (!prefs) throw new NotFoundException('Preferences not found');

        return {
            ...prefs,
            selectedVibes: this.safeJsonParse(prefs.selectedVibes),
            selectedLifeVibes: this.safeJsonParse(prefs.selectedLifeVibes),
            selectedExperienceTypes: this.safeJsonParse(
                prefs.selectedExperienceTypes,
            ),
            selectedTimeWindows: this.safeJsonParse(prefs.selectedTimeWindows),
            selectedGroupSizes: this.safeJsonParse(prefs.selectedGroupSizes),
        };
    }

    async update(userId: string, dto: UpdateUserPreferencesDto) {
        const prefs = await this.repo.findOne({
            where: { user: { id: userId } },
        });
        if (!prefs) throw new NotFoundException('Preferences not found');

        Object.assign(prefs, {
            selectedVibes: JSON.stringify(dto.selectedVibes),
            selectedLifeVibes: JSON.stringify(dto.selectedLifeVibes),
            selectedExperienceTypes: JSON.stringify(
                dto.selectedExperienceTypes,
            ),
            selectedTimeWindows: JSON.stringify(dto.selectedTimeWindows),
            selectedGroupSizes: JSON.stringify(dto.selectedGroupSizes),
            budget: dto.budget,
            distanceRadius: dto.distanceRadius,
        });

        return this.repo.save(prefs);
    }
}
