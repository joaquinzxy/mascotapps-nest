import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersDto } from './dtos/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ) {

    }

    @Get()
    getAllDogs() {
        return this.usersService.getAll()
    }

    @Get(':term')
    getOneDog(@Param('term') term: string) {
        return this.usersService.getOne(term)
    }

    @Post()
    AddDog(@Body() usersDto: UsersDto) {
        return this.usersService.addOne(usersDto)
    }

    @Patch(':id')
    updateCat(@Body() userDto: UsersDto, @Param('id') id: string) {
        return this.usersService.update(id, userDto)
    }

    @Delete(':term')
    DeleteDog(@Param('term') term: string) {
        return this.usersService.delete(term)
    }
}
