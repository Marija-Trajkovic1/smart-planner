import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Category } from '../category/category.entity';

@Entity('generalnotes')
export class GeneralNote {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({nullable: true})
    priority?: number;

    @Column({nullable: true})
    isDone?: boolean;

    @ManyToOne(()=>User, (user)=>user.generalNotes, {onDelete: 'CASCADE'})
    user: User;

    @ManyToOne(()=>Category, (category)=>category.generalNotes, {nullable: true, onDelete: 'SET NULL'})
    category?: Category;
    


}