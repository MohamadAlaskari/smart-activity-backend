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

    @Column({ type: 'json' })
    selectedLifeVibes: string[];

    @Column({ type: 'json' })
    selectedExperienceTypes: string[];

    @Column('float')
    budget: number;

    @Column('float')
    distanceRadius: number;

    @Column({ type: 'json' })
    selectedTimeWindows: string[];

    @Column({ type: 'json' })
    selectedGroupSizes: string[];
}
