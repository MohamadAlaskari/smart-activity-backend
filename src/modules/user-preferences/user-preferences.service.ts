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
        const createdPrefs = await this.repo.save(newPrefs);

        return {
            ...createdPrefs,
            selectedVibes: this.safeJsonParse(createdPrefs.selectedVibes),
            selectedLifeVibes: this.safeJsonParse(
                createdPrefs.selectedLifeVibes,
            ),
            selectedExperienceTypes: this.safeJsonParse(
                createdPrefs.selectedExperienceTypes,
            ),
            selectedTimeWindows: this.safeJsonParse(
                createdPrefs.selectedTimeWindows,
            ),
            selectedGroupSizes: this.safeJsonParse(
                createdPrefs.selectedGroupSizes,
            ),
        };
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
            budget: prefs.budget,
            distanceRadius: prefs.distanceRadius,
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
        const updatedPrefs = await this.repo.save(prefs);

        return {
            ...updatedPrefs,
            selectedVibes: this.safeJsonParse(updatedPrefs.selectedVibes),
            selectedLifeVibes: this.safeJsonParse(
                updatedPrefs.selectedLifeVibes,
            ),
            selectedExperienceTypes: this.safeJsonParse(
                updatedPrefs.selectedExperienceTypes,
            ),
            selectedTimeWindows: this.safeJsonParse(
                updatedPrefs.selectedTimeWindows,
            ),
            selectedGroupSizes: this.safeJsonParse(
                updatedPrefs.selectedGroupSizes,
            ),
        };
    }

    private safeJsonParse(value: string): any {
        try {
            return value ? JSON.parse(value) : [];
        } catch {
            return [];
        }
    }
}
