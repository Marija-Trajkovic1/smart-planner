import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Day } from '../day/day.entity';
import { GeneralNote } from '../generalnotes/generalnotes.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique: true})
    email: string;

    @Exclude()
    @Column()
    password: string;

    @OneToMany(()=>Day, (day)=>day.user)
    days: Day[];

    @OneToMany(()=>GeneralNote, (generalNote)=>generalNote.user)
    generalNotes: GeneralNote[];
}