import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GeneralNote } from './generalnotes.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateGeneralNoteDto } from '../dtos/general-notes/create-general-note.dto';
import { UpdateGeneralNoteDto } from '../dtos/general-notes/update-general-note.dto';
import { DailyNotesService } from '../dailynotes/dailynotes.service';
import { CreateDailyNoteDto } from '../dtos/daily-notes/create-daily-notes.dto';
import { GeneralNotesResponseDto } from '../dtos/general-notes/general-notes-response.dto';
import { plainToInstance } from 'class-transformer';
import { Category } from '../category/category.entity';
import { DailyNoteResponseDto } from '../dtos/daily-notes/daily-note-response.dto';
import { UpdatePriorityItemDto } from '../dtos/general-notes/update-priority-general-notre.dto';

@Injectable()
export class GeneralNotesService {
    constructor(
        @InjectRepository(GeneralNote)
        private generalNoteRepository: Repository<GeneralNote>,

        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,

        private readonly dataSource: DataSource,

        private readonly dailyNotesService: DailyNotesService,
    ){}

    async createGeneralNote(userId: number, newGeneralNote: CreateGeneralNoteDto)
    :Promise<GeneralNotesResponseDto> 
    {
        const generalNoteToCreate = this.generalNoteRepository.create({
            ...newGeneralNote,
            user:{ id: userId }
        });
        
        const createdGeneralNote = this.generalNoteRepository.save(generalNoteToCreate);
        return plainToInstance(GeneralNotesResponseDto, createdGeneralNote);
    }

    async updateGeneralNote(userId: number, generalNoteId: number, updateData: UpdateGeneralNoteDto)
    :Promise<GeneralNotesResponseDto>{
        const existingGenNote = await this.generalNoteRepository.findOne({
            where:{
                id: generalNoteId,
                user: {id: userId}
            }
        });

        if(!existingGenNote)
            throw new NotFoundException('Generalna obaveza za ažuriranje nije pronadjena.');

        existingGenNote.title = updateData.title;
        const updatedGeneralNote = await this.generalNoteRepository.save(existingGenNote);
        return plainToInstance(GeneralNotesResponseDto, updatedGeneralNote);
    }

    async deleteGeneralNote(userId: number, generalNoteId: number): Promise<{ message: string }> {
        const existingGenNote = await this.generalNoteRepository.findOne({
            where:{
                id: generalNoteId,
                user: {id: userId}
            }
        });

        if (!existingGenNote) {
            throw new NotFoundException('Generalna beleška koju želite da obrišete nije pronađena.');
        }

        const result = await this.generalNoteRepository.delete(existingGenNote.id);
        
        if (result.affected === 0) {
            throw new NotFoundException('Generalna beleška nije obrisana!');
        }

        return {
            message: 'Generalna beleška uspešno obrisana!',
        };
    }

    async getListOfGeneralNotesForUser(userId: number): Promise<GeneralNotesResponseDto[]>{
        const generalNotes = await this.generalNoteRepository.find({
                    where: {
                        user: {
                            id: userId,
                        },
                    },
                });
        
        return plainToInstance(GeneralNotesResponseDto, generalNotes);
    }

    async solveGeneralNote(userId: number, generalNoteId: number, dayId: number, createDailyNoteDto: CreateDailyNoteDto,
    ): Promise<DailyNoteResponseDto>{
         return this.dataSource.transaction(async (manager) => {

            const generalNoteRepository = manager.getRepository(GeneralNote);

            const generalNote = await generalNoteRepository.findOne({
                where: {
                    id: generalNoteId,
                    user: { id: userId },
                },
            });

            if (!generalNote)
                throw new NotFoundException('Generalna obaveza ne postoji!',);
            
            if (generalNote.isDone) 
                throw new ConflictException('Generalna obaveza je već završena!');

            generalNote.isDone = true;
            await generalNoteRepository.save(generalNote);

            const dailyNote =
                await this.dailyNotesService.createDailyNote(
                    userId,
                    dayId,
                    createDailyNoteDto,
                    manager,
                );

            return dailyNote;
        });
    }

    async updatePriorities(userId: number, updatedItems: UpdatePriorityItemDto[]): Promise<void> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            for (const item of updatedItems) {
                await queryRunner.manager.update(
                GeneralNote,
                { id: item.id, user: { id: userId } },
                { priority: item.priority }
                );
            }
            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

}
