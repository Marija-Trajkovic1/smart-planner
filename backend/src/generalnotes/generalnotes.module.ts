import { Module } from '@nestjs/common';
import { GeneralNotesService } from './generalnotes.service';
import { GeneralNotesController } from './generalnotes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralNote } from './generalnotes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GeneralNote])],
  providers: [GeneralNotesService],
  controllers: [GeneralNotesController]
})
export class GeneralnotesModule {}
