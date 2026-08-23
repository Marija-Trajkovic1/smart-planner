import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../core/guards/jwt.guard';
import { GetUser } from '../core/decorators/get-user.decorator';
import { CreateGeneralNoteDto } from '../dtos/general-notes/create-general-note.dto';
import { GeneralNotesService } from './generalnotes.service';

@Controller('generalnotes')
export class GeneralNotesController {
    constructor(private generalNotesService: GeneralNotesService){}

    @UseGuards(JwtAuthGuard)
    @Post('createGeneralNote')
    async createGeneralNote(
        @GetUser('id') userId: number,
        @Body() newGeneralNote: CreateGeneralNoteDto
    ){
        return this.generalNotesService.createGeneralNote(userId, newGeneralNote);
    }
}
