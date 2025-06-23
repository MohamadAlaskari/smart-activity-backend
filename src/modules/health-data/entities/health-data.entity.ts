// src/modules/health-data/entities/health-data.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { BloodPressure } from './blood-pressure.embedded';

@Entity()
export class HealthData {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.healthData, {
        onDelete: 'CASCADE',
    })
    user: User;

    @Column({ type: 'date' })
    date: string;

    @Column({ type: 'int', nullable: true })
    steps_today: number;

    @Column({ type: 'int', nullable: true })
    steps_week_average: number;

    @Column({ type: 'int', nullable: true })
    activity_minutes_today: number;

    @Column({ type: 'int', nullable: true })
    activity_minutes_week_average: number;

    @Column({ type: 'int', nullable: true })
    resting_heart_rate: number;

    @Column({ type: 'float', nullable: true })
    sleep_hours_last_night: number;

    @Column({ type: 'float', nullable: true })
    sleep_hours_week_average: number;

    @Column({ nullable: true })
    sleep_quality: string;

    @Column({ type: 'int', nullable: true })
    calories_burned_today: number;

    @Column({ nullable: true })
    workout_type_last: string;

    @Column({ type: 'int', nullable: true })
    workout_duration_last: number;

    @Column({ type: 'int', nullable: true })
    workout_frequency_week: number;

    @Column({ nullable: true })
    stress_level: string;

    @Column({ type: 'float', nullable: true })
    weight_kg: number;

    @Column({ type: 'float', nullable: true })
    bmi: number;

    @Column((type) => BloodPressure)
    blood_pressure: BloodPressure;

    @Column({ type: 'int', nullable: true })
    active_energy_burned_today: number;

    @Column({ type: 'int', nullable: true })
    hydration_ml_today: number;

    @Column({ nullable: true })
    mood_today: string;

    @Column({ nullable: true })
    menstruation_phase: string;
}
