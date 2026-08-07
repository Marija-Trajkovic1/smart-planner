import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DailyNote } from '../dailynotes/dailynotes.entity';
import { GeneralNote } from '../generalnotes/generalnotes.entity';

 @Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    icon: string;

    @OneToMany(()=>GeneralNote, (generalNote)=>generalNote.category)
    generalNotes: GeneralNote[];

    @OneToMany(()=>DailyNote, (dailyNote)=>dailyNote.category)
    dailyNotes: DailyNote[];

}