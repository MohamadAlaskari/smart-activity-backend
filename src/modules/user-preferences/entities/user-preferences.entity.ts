import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_preferences')
export class UserPreferences {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column({ type: 'json' })
  selectedVibes: string[];

  @Column()
  rememberVibe: boolean;

  @Column({ type: 'json' })
  selectedLifeVibes: string[];

  @Column({ type: 'json' })
  selectedExperienceTypes: string[];

  @Column('float')
  budget: number;

  @Column()
  rememberBudget: boolean;

  @Column('float')
  distanceRadius: number;

  @Column()
  rememberDistance: boolean;

  @Column({ type: 'json' })
  selectedTimeWindows: string[];

  @Column()
  rememberTimeWindow: boolean;

  @Column({ type: 'json' })
  selectedGroupSizes: string[];

  @Column()
  location: string;

  @Column()
  date: string;
}
