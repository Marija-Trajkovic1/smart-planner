import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Day } from '../day/day.entity';
import { GeneralNote } from '../generalnotes/generalnotes.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column()
    surname: string;

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