import { IsString, Length, IsNumber, Min } from "class-validator"

export class DogsDto {

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