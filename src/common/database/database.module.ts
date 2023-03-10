import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'cencosudJDS!',
            synchronize: true,
            database: 'mascotapps',
            autoLoadEntities: true,
        })
    ]
})
export class DatabaseModule {

}

