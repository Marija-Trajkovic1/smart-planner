import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Day } from './day.entity';
import { CreateDayDto } from '../dtos/days/create-day.dto';

@Injectable()
export class DayService {
    constructor(
        @InjectRepository(Day)
        private dayRepository: Repository<Day>
    ){}

    async createDayForUser(userId:number, createDayDto: CreateDayDto): Promise<Day>{
        const {date} = createDayDto;

        const existingDay = await this.dayRepository.findOne({
            where:{
                date: date,
                user: { id: userId }
            }
        });

        if(existingDay){
            throw new ConflictException('Dan za datum ${date} već postoji.');
        }

        const newDay = this.dayRepository.create({
            date: date,
            user:{id:userId}
        });

        return await this.dayRepository.save(newDay);

    }

    async getDaysForUser(userId: number){
       return await this.dayRepository.find({
            where :{ user : {id:userId} },
            relations : {
                dailyNotes:{
                    category: true,
                }
            },
            order: {date: 'ASC'}
        });
    }
}
