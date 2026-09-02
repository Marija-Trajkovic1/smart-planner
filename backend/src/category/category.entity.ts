import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DailyNote } from '../dailynotes/dailynotes.entity';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany(()=>DailyNote, (dailyNote)=>dailyNote.category)
    dailyNotes: DailyNote[];

}