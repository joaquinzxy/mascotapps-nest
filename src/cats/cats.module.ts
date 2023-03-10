import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cats } from './entities/cats.entity';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  imports: [
    TypeOrmModule.forFeature([Cats])
  ]
})
export class CatsModule { }
