import { Module } from '@nestjs/common';
import { GeneralNotesService } from './generalnotes.service';
import { GeneralNotesController } from './generalnotes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralNote } from './generalnotes.entity';
import { Category } from '../category/category.entity';
import { DailyNote } from '../dailynotes/dailynotes.entity';
import { DailyNotesService } from '../dailynotes/dailynotes.service';
import { Day } from '../day/day.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GeneralNote, Category, Day, DailyNote])],
  providers: [GeneralNotesService, DailyNotesService],
  controllers: [GeneralNotesController]
})
export class GeneralnotesModule {}
