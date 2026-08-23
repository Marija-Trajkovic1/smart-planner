import { Module } from '@nestjs/common';
import { DailyNotesService } from './dailynotes.service';
import { DailynotesController } from './dailynotes.controller';
import { DailyNote } from './dailynotes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../category/category.entity';
import { Day } from '../day/day.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DailyNote, Day, Category])
  ],
  providers: [DailyNotesService],
  controllers: [DailynotesController]
})
export class DailynotesModule {}
