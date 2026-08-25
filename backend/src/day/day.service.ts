import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Day } from './day.entity';
import { CreateDayDto } from '../dtos/days/create-day.dto';
import { plainToInstance } from 'class-transformer';
import { DayWithDailyNotesResponseDto } from '../dtos/days/day-with-notes-response.dto';
import { DayResponseDto } from '../dtos/days/day-response.dto';

@Injectable()
export class DayService {
    constructor(
        @InjectRepository(Day)
        private dayRepository: Repository<Day>
    ){}

    async createDayForUser(userId:number, createDayDto: CreateDayDto): Promise<DayResponseDto>{
        const {date} = createDayDto;

        const existingDay = await this.dayRepository.findOne({
            where:{
                date: date,
                user: { id: userId }
            }
        });

        if(existingDay)
            throw new ConflictException(`Dan za datum ${date} već postoji.`);

        const newDay = this.dayRepository.create({
            date: date,
            user:{id:userId}
        });

        const createdDay = await this.dayRepository.save(newDay);
        return plainToInstance(DayResponseDto, createdDay);
    }

    async getDaysForUser(userId: number): Promise<DayWithDailyNotesResponseDto[]>{
       const daysForUser = await this.dayRepository.find({
            where: { user: { id: userId } },
            relations : {
                dailyNotes: true,
            },
            order: {date: 'DESC'}
        });

        return plainToInstance(DayWithDailyNotesResponseDto, daysForUser);
    }

    async deleteDayForUser(userId: number, dayId: number): Promise<{ message: string }>{
        const result = await this.dayRepository.delete({
            id: dayId,
            user: { id: userId }
        });

        if (result.affected === 0)
            throw new NotFoundException('Dan nije pronađen ili nemate dozvolu da ga obrišete.');

        return {
            message: 'Dan je uspešno obrisan!',
        };  
    }
}
