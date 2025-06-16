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

        return this.repo.save(newPrefs);
    }

    async getByUserId(userId: string) {
        const prefs = await this.repo.findOne({
            where: { user: { id: userId } },
        });
        if (!prefs) throw new NotFoundException('Preferences not found');

        return {
            ...prefs,
            selectedVibes: JSON.parse(prefs.selectedVibes),
            selectedLifeVibes: JSON.parse(prefs.selectedLifeVibes),
            selectedExperienceTypes: JSON.parse(prefs.selectedExperienceTypes),
            selectedTimeWindows: JSON.parse(prefs.selectedTimeWindows),
            selectedGroupSizes: JSON.parse(prefs.selectedGroupSizes),
        };
    }

    async update(userId: string, dto: UpdateUserPreferencesDto) {
        const prefs = await this.repo.findOne({
            where: { user: { id: userId } },
        });
        if (!prefs) throw new NotFoundException('Preferences not found');

        Object.assign(prefs, {
            ...dto,
            selectedVibes: JSON.stringify(dto.selectedVibes),
            selectedLifeVibes: JSON.stringify(dto.selectedLifeVibes),
            selectedExperienceTypes: JSON.stringify(
                dto.selectedExperienceTypes,
            ),
            selectedTimeWindows: JSON.stringify(dto.selectedTimeWindows),
            selectedGroupSizes: JSON.stringify(dto.selectedGroupSizes),
        });

        return this.repo.save(prefs);
    }
}
