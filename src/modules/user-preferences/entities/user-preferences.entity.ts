import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { PreferredTime } from '../enums/preferred-time.enum';
import { TransportMode } from '../enums/transport-mode.enum';
import { PreferenceGoal } from '../enums/preferences-goals.enum';

@Entity('user_preferences')
export class UserPreferences {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column('simple-array', { nullable: true })
  @ApiProperty({ example: ['cinema', 'hiking'] })
  favoriteActivities?: string[];

  @Column('simple-array', { nullable: true })
  @ApiProperty({ enum: PreferredTime, isArray: true })
  preferredTimes?: PreferredTime[];

  @Column({ default: true })
  @ApiProperty({ example: true })
  likesGroupActivities: boolean;

  @Column('decimal', { nullable: true })
  @ApiProperty({ example: 50.0 })
  budgetMin?: number;

  @Column('decimal', { nullable: true })
  @ApiProperty({ example: 200.0 })
  budgetMax?: number;

  @Column('simple-array', { nullable: true })
  @ApiProperty({ enum: TransportMode, isArray: true })
  preferredTransportModes?: TransportMode[];

  @Column('simple-array', { nullable: true })
  @ApiProperty({ enum: PreferenceGoal, isArray: true })
  goals?: PreferenceGoal[];
}
