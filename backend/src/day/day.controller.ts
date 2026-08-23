import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { DayService } from './day.service';
import { DayResponseDto } from '../dtos/days/day-response.dto';
import { JwtAuthGuard } from '../core/guards/jwt.guard';
import { GetUser } from '../core/decorators/get-user.decorator';
import { plainToInstance } from 'class-transformer';
import { CreateDayDto } from '../dtos/days/create-day.dto';

@Controller('day')
export class DayController {
    constructor(private dayService: DayService){}

    @UseGuards(JwtAuthGuard)
    @Post('createDayForUser')
    async createDayForUser(
        @GetUser('id') userId: number,
        @Body() createDayDto: CreateDayDto
    ){
        return this.dayService.createDayForUser(userId, createDayDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('getDaysForUser')
    async getDaysForUser(@GetUser('id') userId: number ):Promise<DayResponseDto[]>{
        const userDays = await this.dayService.getDaysForUser(userId);
        return plainToInstance(DayResponseDto, userDays);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('deleteDayForUse/:dayId')
    async deleteDayForUser(
        @GetUser('id') userId: number,
        @Param('dayId', ParseIntPipe) dayId : number
    ): Promise<{ message: string }>{
        return this.dayService.deleteDayForUser(userId, dayId);
    }  
    
    
}
