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
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;
    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;

    @Column({ type: 'longtext' })
    selectedVibes: string;

    @Column({ type: 'longtext' })
    selectedLifeVibes: string;

    @Column({ type: 'longtext' })
    selectedExperienceTypes: string;

    @Column('float')
    budget: number;

    @Column('float')
    distanceRadius: number;

    @Column({ type: 'longtext' })
    selectedTimeWindows: string;

    @Column({ type: 'longtext' })
    selectedGroupSizes: string;
}
