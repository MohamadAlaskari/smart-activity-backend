import { ApiProperty } from '@nestjs/swagger';
import { HealthData } from 'src/modules/health-data/entities/health-data.entity';
import { UserPreferences } from 'src/modules/user-preferences/entities/user-preferences.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
    @OneToOne(() => UserPreferences, (preferences) => preferences.user, {
        cascade: ['remove'],
    })
    preferences: UserPreferences;

    @OneToMany(() => HealthData, (healthData) => healthData.user)
    healthData: HealthData[];

    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'Unique user ID' })
    id: string;

    @Column({ length: 50 })
    @ApiProperty({ example: 'John', description: 'User first name' })
    firstName: string;

    @Column({ length: 50 })
    @ApiProperty({ example: 'Doe', description: 'User last name' })
    lastName: string;

    @Column({ length: 50, unique: true })
    @ApiProperty({ example: 'johndoe', description: 'Unique username' })
    username: string;

    @Column({ unique: true })
    @ApiProperty({
        example: 'user@example.com',
        description: 'User email address',
    })
    email: string;

    @Column()
    @ApiProperty({ description: 'Hashed password' })
    password: string;

    @Column({ default: false })
    @ApiProperty({
        description: 'Indicates whether the user has verified their email',
        example: false,
    })
    isEmailVerified: boolean;

    @Column({ type: 'date', nullable: true })
    @ApiProperty({
        example: '1997-05-15',
        required: false,
        description: 'User birth date (optional)',
    })
    dateOfBirth?: Date;

    @Column({ default: true })
    isFirstLogin: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    @ApiProperty({ description: 'Timestamp when the user was created' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    @ApiProperty({ description: 'Timestamp when the user was last updated' })
    updatedAt: Date;
}
