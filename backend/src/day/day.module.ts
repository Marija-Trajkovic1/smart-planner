import { Module } from '@nestjs/common';
import { DayService } from './day.service';
import { DayController } from './day.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Day } from './day.entity';
import { DayService } from './day.service';

@Module({
  imports: [TypeOrmModule.forFeature([Day])],
  providers: [DayService],
  controllers: [DayController]
})
export class DayModule {}
