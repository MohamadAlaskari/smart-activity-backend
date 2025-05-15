import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPreferences } from './entities/user-preferences.entity';
import { CreateUserPreferencesDto } from './dto/create-user-preferences.dto';
import { UpdateUserPreferencesDto } from './dto/update-user-preferences.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class UserPreferencesService {
  constructor(
    @InjectRepository(UserPreferences)
    private readonly preferencesRepo: Repository<UserPreferences>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(userId: string, dto: CreateUserPreferencesDto) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const preferences = this.preferencesRepo.create({
      ...dto,
      user,
    });
    return this.preferencesRepo.save(preferences);
  }

  async findByUser(userId: string) {
    const prefs = await this.preferencesRepo.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    if (!prefs) throw new NotFoundException('Preferences not found');
    return prefs;
  }

  async update(userId: string, dto: UpdateUserPreferencesDto) {
    const prefs = await this.findByUser(userId);
    Object.assign(prefs, dto);
    return this.preferencesRepo.save(prefs);
  }
  async delete(userId: string): Promise<{ message: string }> {
    const prefs = await this.findByUser(userId);
    await this.preferencesRepo.remove(prefs);
    return { message: 'User preferences deleted successfully' };
  }
}
