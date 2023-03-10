import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { DogsModule } from './dogs/dogs.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { DatabaseModule } from './common/database/database.module';

@Module({
  imports: [
    CatsModule,
    DogsModule,
    UsersModule,
    PostsModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
