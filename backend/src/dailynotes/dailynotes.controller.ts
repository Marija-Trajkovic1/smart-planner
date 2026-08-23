import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { DailyNotesService } from './dailynotes.service';
import { JwtAuthGuard } from '../core/guards/jwt.guard';
import { GetUser } from '../core/decorators/get-user.decorator';
import { CreateDailyNoteDto } from '../dtos/daily-notes/create-daily-notes.dto';
import { UpdateDailyNoteDto } from '../dtos/daily-notes/update-daily-note.dto';
import { DailyNoteResponseDto } from '../dtos/daily-notes/daily-note-response.dto';

@Controller('dailynotes')
export class DailynotesController {
    constructor(private dailyNoteService: DailyNotesService){}

    @UseGuards(JwtAuthGuard)
    @Get('getListDailyNotesForDay/:dayId')
    async getListDailyNotesForDay(
        @GetUser('id') userId: number,
        @Param('dayId', ParseIntPipe) dayId: number
    ): Promise<DailyNoteResponseDto[]>{
        return this.dailyNoteService.getListDailyNotesForDay(userId, dayId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('createDailyNoteForUserAndDay/:dayId')
    async createDailyNoteForUserAndDay(
        @GetUser('id') userId: number,
        @Param('dayId', ParseIntPipe) dayId: number,
        @Body() createDailyNoteDto: CreateDailyNoteDto
    ){
        return this.dailyNoteService.createDailyNoteForUserAndDay(
            userId,
            createDailyNoteDto,
            dayId);
    }

    @UseGuards(JwtAuthGuard)
    @Put('updateDailyNoteForUser/:dailyNoteId')  
    async updateDailyNoteForUser(
        @GetUser('id') userId: number,
        @Param('dailyNoteId', ParseIntPipe) dailyNoteId: number,
        @Body() updateDailyNoteDto: UpdateDailyNoteDto
    ){
        return this.dailyNoteService.updateDailyNoteForUser(userId, dailyNoteId, updateDailyNoteDto)
    }

    @UseGuards(JwtAuthGuard)
    @Put('finishDailyNote/:dailyNoteId')
    async finishDailyNote(
        @GetUser('id') userId: number,
        @Param('dailyNoteId', ParseIntPipe) dailyNoteId: number
    ){
        return this.dailyNoteService.finishDailyNote(userId, dailyNoteId);
    }

    @UseGuards(JwtAuthGuard)
    @Put('updateDailyNotePriority/:dailyNoteId') 
    async updateDailyNotePriority(
        @GetUser('id') userId: number,
        @Param('dailyNoteId', ParseIntPipe) dailyNoteId: number,
        @Body('priority') newPriority: number
    ): Promise<{message: string}> {
        return this.updateDailyNotePriority(userId, dailyNoteId, newPriority);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('deleteDailyNote/:dailyNoteId')
    async deleteDailyNote(
        @GetUser('id') userId: number,
        @Param('dailyNoteId', ParseIntPipe) dailyNoteId: number
    ): Promise<{message: string}>{
        return this.dailyNoteService.deleteDailyNote(userId, dailyNoteId);
    }

    
    
    

}
