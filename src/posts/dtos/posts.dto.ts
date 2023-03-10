import { Contains, IsIn, IsMimeType, IsOptional, IsString, Length } from "class-validator";

export class PostsDto {

    @IsString()
    @Length(10, 100)
    title: string

    @IsString()
    @Length(10, 200)
    body: string

    @IsIn(['dogs', 'cats', 'offtopic', 'news'])
    category: string

    @IsString()
    @Length(5, 200)
    @IsOptional()
    image?: string

    @IsString()
    @Length(5, 200)
    owner: string
}