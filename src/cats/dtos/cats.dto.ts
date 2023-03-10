import { IsNumber, IsString, Length, Min, MinLength } from "class-validator";

export class CatsDto {

    @IsString()
    @Length(2, 20)
    name: string

    @IsNumber()
    @Min(0)
    age: number

    @IsString()
    @Length(2, 100)
    owner: string

    @IsString()
    @Length(2, 20)
    color: string
}