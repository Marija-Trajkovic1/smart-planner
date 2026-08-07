import { Module } from '@nestjs/common';
import { GeneralnotesService } from './generalnotes.service';
import { GeneralnotesController } from './generalnotes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralNote } from './generalnotes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GeneralNote])],
  providers: [GeneralnotesService],
  controllers: [GeneralnotesController]
})
export class GeneralnotesModule {}
