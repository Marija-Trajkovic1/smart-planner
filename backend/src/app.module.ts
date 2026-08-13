import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/user.entity';
import { Category } from './category/category.entity';
import { Day } from './day/day.entity';
import { DailyNote } from './dailynotes/dailynotes.entity';
import { GeneralNote } from './generalnotes/generalnotes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { DailynotesModule } from './dailynotes/dailynotes.module';
import { DayModule } from './day/day.module';
import { GeneralnotesModule } from './generalnotes/generalnotes.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'mysecretpassword',
      database: 'smartplanner',
      entities: [User, Category, Day, DailyNote, GeneralNote],
      synchronize: true,
    }),
    UserModule,
    CategoryModule,
    DailynotesModule,
    DayModule,
    GeneralnotesModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
