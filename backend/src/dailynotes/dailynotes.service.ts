import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDailyNoteDto } from '../dtos/daily-notes/create-daily-notes.dto';
import { DailyNote } from './dailynotes.entity';
import { Repository } from 'typeorm';
import { Day } from '../day/day.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../category/category.entity';
import { UpdateDailyNoteDto } from '../dtos/daily-notes/update-daily-note.dto';
import { DailyNoteResponseDto } from '../dtos/daily-notes/daily-note-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class DailyNotesService {
    constructor(
        @InjectRepository(DailyNote)
        private dailyNoteRepository: Repository<DailyNote>,
        
        @InjectRepository(Day )
        private dayRepository: Repository<Day>,

        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ){}

    async createDailyNoteForUserAndDay(
        userId: number,
        createDailyNoteDto: CreateDailyNoteDto,
        dayId: number)
    {
        const day = await this.dayRepository.findOne({
              where: { id: dayId, user: { id: userId } }
        });

        if(!day){
            throw new NotFoundException('Nemate kreirani dati datum!');
        }

        let category: Category | undefined = undefined;

        if(createDailyNoteDto.categoryId !== undefined){
            const existingCategory = await this.categoryRepository.findOne({
                where: {id:createDailyNoteDto.categoryId }
            });

            existingCategory !== null ? category = existingCategory : category=undefined;
        }

        let newDailyNote = new  DailyNote();
        newDailyNote.title = createDailyNoteDto.title;
        newDailyNote.time = createDailyNoteDto.time;
        newDailyNote.location = createDailyNoteDto.location;
        newDailyNote.priority = createDailyNoteDto.priority;
        newDailyNote.reminder = createDailyNoteDto.reminder;
        newDailyNote.link = createDailyNoteDto.link;
        newDailyNote.isDone = false;
        newDailyNote.category  = category;
        newDailyNote.day = day;
        newDailyNote.isTheMostImportantToday = createDailyNoteDto.isTheMostImportantToday;
        newDailyNote.textHeight = createDailyNoteDto.textHeight;
        newDailyNote.textType = createDailyNoteDto.textType;
        
        return await this.dailyNoteRepository.save(newDailyNote);
    }

    async updateDailyNoteForUser(userId: number, dailyNoteId: number, updateDailyNoteDto:  UpdateDailyNoteDto){
        const dailyNoteForUpdate = await this.findDailyNote(dailyNoteId, userId);

        if(!dailyNoteForUpdate){
            throw new NotFoundException('Dnevna obaveza nije nadjena');
        }

        Object.assign(dailyNoteForUpdate, updateDailyNoteDto);
        return this.dailyNoteRepository.save(dailyNoteForUpdate);

    }

    async finishDailyNote(userId: number, dailyNoteId: number){
        const dailyNoteForFinish = await this.findDailyNote(dailyNoteId, userId);

        if (!dailyNoteForFinish) {
            throw new NotFoundException('Daily note not found');
        }
       
        dailyNoteForFinish.isDone = true;
        return this.dailyNoteRepository.save(dailyNoteForFinish);
    }

    async deleteDailyNote(userId: number, dailyNoteId: number): Promise<{message: string}>{
        const dailyNoteForDelete = await this.findDailyNote(dailyNoteId, userId);
       
        if (!dailyNoteForDelete) {
            throw new NotFoundException('Daily note not found');
        }

        const result = await this.dailyNoteRepository.delete(dailyNoteForDelete.id);
        
        if (result.affected === 0) {
            throw new NotFoundException('Daily note could not be deleted');
        }

        return {
            message: 'Daily note successfully deleted',
        };
    }

    async getListDailyNotesForDay(userId: number, dayId: number): Promise<DailyNoteResponseDto[]>{
        const dailyNotes = await this.dailyNoteRepository.find({
            where: {
                day: {
                    id: dayId,
                    user: {
                        id: userId,
                    },
                },
            },
            relations: {
                category: true,
            },
        });

        return plainToInstance(DailyNoteResponseDto, dailyNotes);
    }

    async updateDailyNotePriority(userId: number, dailyNoteId: number, newPriority: number): Promise<{message: string}>{
        const dailyNoteForUpdatePriority = await this.findDailyNote(dailyNoteId, userId);
        if(!dailyNoteForUpdatePriority){
            throw new NotFoundException('Daily note not found!');
        }

        dailyNoteForUpdatePriority.priority = newPriority;
        const result = await this.dailyNoteRepository.save(dailyNoteForUpdatePriority);

        return {
            message: 'Priority updated successfully.'
        }

    }

    private async findDailyNote(dailyNoteId: number, userId: number): Promise<DailyNote | null> {
        const dailyNote = await this.dailyNoteRepository.findOne({
            where: {
                id: dailyNoteId,
                day: {
                    user: {
                        id: userId,
                    }
                }
            }
        });
        return dailyNote;
    }


}
