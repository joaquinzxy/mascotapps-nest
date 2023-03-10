import { IsEmail, IsIn, IsMimeType, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { Posts } from "src/posts/entities/posts.entity";
import { OneToMany } from "typeorm";

export class UsersDto {

    @IsString()
    @Length(2, 20)
    username: string

    @IsEmail()
    email: string

    @IsString()
    @IsIn(['admin', 'moderator', 'customer'])
    role: string

    @IsNotEmpty()
    password: string

    @IsString()
    @IsMimeType()
    @Length(5, 200)
    @IsOptional()
    image?: string
}