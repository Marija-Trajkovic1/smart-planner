import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GeneralNote } from './generalnotes.entity';
import { Repository } from 'typeorm';
import { CreateGeneralNoteDto } from '../dtos/general-notes/create-general-note.dto';

@Injectable()
export class GeneralNotesService {
    constructor(
        @InjectRepository(GeneralNote)
        private generalNoteRepository: Repository<GeneralNote>
    ){}

    async createGeneralNote(userId: number, newGeneralNote: CreateGeneralNoteDto){
        
    }
}
