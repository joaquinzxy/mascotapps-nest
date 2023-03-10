import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from 'src/posts/posts.module';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';
import { Dogs } from './entities/dogs.entity';

@Module({
  controllers: [DogsController],
  providers: [DogsService],
  imports: [
    TypeOrmModule.forFeature([Dogs])
  ]
})
export class DogsModule { }
