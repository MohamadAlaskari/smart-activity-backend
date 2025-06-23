// src/modules/health-data/entities/blood-pressure.embedded.ts
import { Column } from 'typeorm';

export class BloodPressure {
    @Column({ type: 'int', nullable: true })
    systolic: number;

    @Column({ type: 'int', nullable: true })
    diastolic: number;
}
