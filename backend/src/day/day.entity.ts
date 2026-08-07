import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { DailyNote } from '../dailynotes/dailynotes.entity';

@Entity('days')
export class Day {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'date'})
    date: string;

    @ManyToOne(()=>User, (user)=>user.days, {onDelete: 'CASCADE'})
    user: User;

    @OneToMany(()=>DailyNote, (dailyNote)=>dailyNote.day)
    dailyNotes: DailyNote[];    
}
