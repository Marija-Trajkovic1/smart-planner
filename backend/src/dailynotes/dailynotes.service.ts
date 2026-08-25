import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDailyNoteDto } from '../dtos/daily-notes/create-daily-notes.dto';
import { DailyNote } from './dailynotes.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
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

        private readonly dataSource: DataSource,
    ){}

    async createDailyNoteForUserAndDay(
        userId: number,
        dayId: number,
        createDailyNoteDto: CreateDailyNoteDto
    ): Promise<DailyNoteResponseDto> {
        return this.dataSource.transaction(async (manager) => {
            const createdDailyNote = this.createDailyNote(
                userId,
                dayId,
                createDailyNoteDto,
                manager,
            );
            return plainToInstance(DailyNoteResponseDto, createdDailyNote);
        });
    }

    async createDailyNote( userId: number, dayId: number, createDailyNoteDto: CreateDailyNoteDto, manager: EntityManager,
    ): Promise<DailyNoteResponseDto> {
        const dayRepository = manager.getRepository(Day);
        const categoryRepository = manager.getRepository(Category);
        const dailyNoteRepository = manager.getRepository(DailyNote);

        const day = await dayRepository.findOne({
            where: { 
                id: dayId, 
                user: { id: userId } 
            },
        });

        if(!day)
            throw new NotFoundException('Nemate kreirani dati datum!');

        let category: Category | undefined = undefined;

        if(createDailyNoteDto.categoryId !== undefined){
            const existingCategory = await categoryRepository.findOne({
                where: {
                    id:createDailyNoteDto.categoryId 
                },
            });

            if(!existingCategory){
                throw new NotFoundException('Kategorija ne postoji!');
            }

            category = existingCategory;
        }
        const {categoryId, ...dailyNoteData} = createDailyNoteDto;

        const dailyNote = dailyNoteRepository.create({
            ...dailyNoteData,
            isDone: false,
            category,
            day,
        });

        const createdDailyNote = await dailyNoteRepository.save(dailyNote);
        return plainToInstance(DailyNoteResponseDto, createdDailyNote);
    }

    async updateDailyNoteForUser(userId: number, dailyNoteId: number, updateDailyNoteDto: UpdateDailyNoteDto){
        const dailyNoteForUpdate = await this.findDailyNote(dailyNoteId, userId);

        if(!dailyNoteForUpdate){
            throw new NotFoundException('Dnevna obaveza nije nadjena');
        }

        Object.assign(dailyNoteForUpdate, updateDailyNoteDto);
        return this.dailyNoteRepository.save(dailyNoteForUpdate);

    }

    async updateCategoryForDailyNote (userId: number, dailyNoteId: number, categoryId: number)
    {
        const dailyNote =  await this.findDailyNote(dailyNoteId, userId);

        if (!dailyNote)
            throw new NotFoundException('Generalna beleška ne postoji!');

        const category = await this.categoryRepository.findOne({
            where: {
                id: categoryId,
            },
        });
        
        if (!category) 
            throw new NotFoundException('Kategorija ne postoji!');
        
        dailyNote.category = category;

        return this.dailyNoteRepository.save(dailyNote);
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
            throw new NotFoundException('Dnevna beleška koju želite da obrišete nije pronađena.');
        }

        const result = await this.dailyNoteRepository.delete(dailyNoteForDelete.id);
        
        if (result.affected === 0) {
            throw new NotFoundException('Dnevna beleška nije obrisana!');
        }

        return {
            message: 'Dnevna beleška uspešno obrisana!',
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

    private async createDailyNoteForGeneralNote(
        userId: number,
        dayId: number,
        createDailyNoteDto: CreateDailyNoteDto,
        manager?: EntityManager
    ){
        const dailyNoteRepository = manager?.getRepository(DailyNote) ?? this.dailyNoteRepository;
        const dayRepository = manager?.getRepository(Day) ?? this.dayRepository;
        const categoryRepository = manager?.getRepository(Category) ?? this.categoryRepository;

        const day = await dayRepository.findOne({
            where: { 
                id: dayId, 
                user: { id: userId } 
            },
        });

        if(!day)
            throw new NotFoundException('Nemate kreirani dati datum!');

        let category: Category | undefined = undefined;

        if(createDailyNoteDto.categoryId !== undefined){
            const existingCategory = await categoryRepository.findOne({
                where: {
                    id:createDailyNoteDto.categoryId 
                },
            });

            if(!existingCategory){
                throw new NotFoundException('Kategorija ne postoji!');
            }

            category = existingCategory;
        }
        const {categoryId, ...dailyNoteData} = createDailyNoteDto;

        const dailyNote = dailyNoteRepository.create({
            ...dailyNoteData,
            isDone: false,
            category,
            day,
        });

        return await dailyNoteRepository.save(dailyNote);
    }
}
