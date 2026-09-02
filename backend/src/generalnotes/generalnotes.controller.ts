import { Body, Controller, Delete, Get, Param, ParseArrayPipe, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../core/guards/jwt.guard';
import { GetUser } from '../core/decorators/get-user.decorator';
import { CreateGeneralNoteDto } from '../dtos/general-notes/create-general-note.dto';
import { GeneralNotesService } from './generalnotes.service';
import { UpdateGeneralNoteDto } from '../dtos/general-notes/update-general-note.dto';
import { CreateDailyNoteDto } from '../dtos/daily-notes/create-daily-notes.dto';
import { GeneralNotesResponseDto } from '../dtos/general-notes/general-notes-response.dto';
import { UpdatePriorityItemDto } from '../dtos/general-notes/update-priority-general-notre.dto';

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

    @UseGuards(JwtAuthGuard)
    @Put('updateGeneralNote/:generalNoteId')
    async updateGeneralNote(
        @GetUser('id') userId: number,
        @Param('generalNoteId', ParseIntPipe) generalNoteId: number,
        @Body()updateGeneralNoteDto:UpdateGeneralNoteDto
    ){
        return this.generalNotesService.updateGeneralNote(userId, generalNoteId, updateGeneralNoteDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('solveGeneralNote/:generalNoteId/:dayId')
    async solveGeneralNote(
        @GetUser('id') userId: number,
        @Param('generalNoteId', ParseIntPipe) generalNoteId: number,
        @Param('dayId', ParseIntPipe) dayId: number,
        @Body() createDailyNoteDto: CreateDailyNoteDto,
    ){
        return this.generalNotesService.solveGeneralNote(userId, generalNoteId, dayId, createDailyNoteDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put('updatePriorities')
    async updatePriorities(
        @GetUser('id') userId: number,
        @Body(new ParseArrayPipe({ items: UpdatePriorityItemDto })) updatedItems: UpdatePriorityItemDto[],
    ): Promise<void> {
        return this.generalNotesService.updatePriorities(userId, updatedItems);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('deleteGeneralNote/:generalNoteId')
    async deleteGeneralNote(
        @GetUser('id') userId: number,
        @Param('generalNoteId', ParseIntPipe) generalNoteId: number,
    ){
        return this.generalNotesService.deleteGeneralNote(userId, generalNoteId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getListOfGeneralNotesForUser')
    async getListOfGeneralNotesForUser(
        @GetUser('id') userId: number
    ): Promise<GeneralNotesResponseDto[]>{
        return this.generalNotesService.getListOfGeneralNotesForUser(userId);
    }

}
