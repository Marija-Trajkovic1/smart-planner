import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { DailyNotesService } from './dailynotes.service';
import { JwtAuthGuard } from '../core/guards/jwt.guard';
import { GetUser } from '../core/decorators/get-user.decorator';
import { CreateDailyNoteDto } from '../dtos/daily-notes/create-daily-notes.dto';
import { UpdateDailyNoteDto } from '../dtos/daily-notes/update-daily-note.dto';
import { DailyNoteResponseDto } from '../dtos/daily-notes/daily-note-response.dto';
import { UpdatePriorityDto } from '../dtos/daily-notes/update-priority.dto';

@Controller('dailynotes')
export class DailynotesController {
    constructor(private dailyNoteService: DailyNotesService){}

    @UseGuards(JwtAuthGuard)
    @Post('createDailyNoteForUserAndDay/:dayId')
    async createDailyNoteForUserAndDay(
        @GetUser('id') userId: number,
        @Param('dayId', ParseIntPipe) dayId: number,
        @Body() createDailyNoteDto: CreateDailyNoteDto
    ): Promise<DailyNoteResponseDto> {
        return this.dailyNoteService.createDailyNoteForUserAndDay(userId, dayId, createDailyNoteDto);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('getListDailyNotesForDay/:dayId')
    async getListDailyNotesForDay(
        @GetUser('id') userId: number,
        @Param('dayId', ParseIntPipe) dayId: number
    ): Promise<DailyNoteResponseDto[]>{
        return this.dailyNoteService.getListDailyNotesForDay(userId, dayId);
    }

    @UseGuards(JwtAuthGuard)
    @Put('updateDailyNoteForUser/:dailyNoteId')  
    async updateDailyNoteForUser(
        @GetUser('id') userId: number,
        @Param('dailyNoteId', ParseIntPipe) dailyNoteId: number,
        @Body() updateDailyNoteDto: UpdateDailyNoteDto
    ): Promise<DailyNoteResponseDto>{
        return this.dailyNoteService.updateDailyNoteForUser(userId, dailyNoteId, updateDailyNoteDto)
    }

    @UseGuards(JwtAuthGuard)
    @Put('updateCategoryForDailyNote/:dailyNoteId/:categoryId')
    async updateCategoryForDailyNote(
        @GetUser('id') userId: number,
        @Param('dailyNoteId')dailyNoteId: number,
        @Param('categoryId') categoryId: number
    ): Promise<DailyNoteResponseDto> {
        return this.dailyNoteService.updateCategoryForDailyNote( userId,dailyNoteId, categoryId);
    }

    @UseGuards(JwtAuthGuard)
    @Put('finishDailyNote/:dailyNoteId')
    async finishDailyNote(
        @GetUser('id') userId: number,
        @Param('dailyNoteId', ParseIntPipe) dailyNoteId: number
    ): Promise<DailyNoteResponseDto> {
        return this.dailyNoteService.finishDailyNote(userId, dailyNoteId);
    }

    @UseGuards(JwtAuthGuard)
    @Put('updateDailyNotePriority/:dailyNoteId/:priority') 
    async updateDailyNotePriority(
        @GetUser('id') userId: number,
        @Param('dailyNoteId', ParseIntPipe) dailyNoteId: number,
        @Param('priority') newPriority: number
    ): Promise<DailyNoteResponseDto> {
        return this.dailyNoteService.updateDailyNotePriority(userId, dailyNoteId, newPriority);
    }

    @Put('updatePriorities')
    async updatePriorities(
        @Body() updatePriorityDtos: UpdatePriorityDto[]
    ) {
        await this.dailyNoteService.updatePriorities(updatePriorityDtos);
        return { success: true, message: 'Prioriteti uspešno ažurirani' };
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
