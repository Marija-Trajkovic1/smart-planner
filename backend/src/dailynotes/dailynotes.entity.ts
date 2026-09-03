import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Day } from '../day/day.entity';
import { Category } from '../category/category.entity';

@Entity('dailynotes')
export class DailyNote {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({type: 'time', nullable: true})
    time?: string;

    @Column({nullable: true})
    location?: string;

    @Column({nullable: true})
    priority?: number;

    @Column({nullable: true})
    link?: string;

    @Column({default: false})
    isDone: boolean;

    @Column({nullable:true})
    textType?: string;

    @Column({nullable:true})
    textHeight?: number;

    @ManyToOne(()=>Category, (category)=>category.dailyNotes, {nullable: true, onDelete: 'SET NULL'})
    category?: Category;

    @ManyToOne(()=>Day, (day)=>day.dailyNotes, {onDelete: 'CASCADE'})
    day: Day;


}