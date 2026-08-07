import { Module } from '@nestjs/common';
import { DailynotesService } from './dailynotes.service';
import { DailynotesController } from './dailynotes.controller';
import { DailyNote } from './dailynotes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DailyNote])],
  providers: [DailynotesService],
  controllers: [DailynotesController]
})
export class DailynotesModule {}
