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
    if (existing) throw new Error('Preferences already exist for this user');

    const newPrefs = this.repo.create({ ...dto, user });
    return this.repo.save(newPrefs);
  }

  async getByUserId(userId: string) {
    const prefs = await this.repo.findOne({ where: { user: { id: userId } } });
    if (!prefs) throw new NotFoundException('Preferences not found');
    return prefs;
  }

  async update(userId: string, dto: UpdateUserPreferencesDto) {
    const prefs = await this.repo.findOne({ where: { user: { id: userId } } });
    if (!prefs) throw new NotFoundException('Preferences not found');
    Object.assign(prefs, dto);
    return this.repo.save(prefs);
  }
}
