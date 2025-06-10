import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('suggestions')
export class Suggestion {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    userId: string;

    @Column({ type: 'json' }) // oder 'simple-json'
    content: any;

    @Column({ default: false })
    selected: boolean;

    @CreateDateColumn()
    createdAt: Date;
}
