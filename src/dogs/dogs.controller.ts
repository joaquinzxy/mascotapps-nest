import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsDto } from './dtos/dogs.dto';

@Controller('dogs')
export class DogsController {

    constructor(
        private readonly dogsService: DogsService
    ) {

    }

    @Get()
    getAllDogs() {
        return this.AddDog
    }

    @Get(':term')
    getOneDog(@Param('term', ParseUUIDPipe) term: string) {
        return this.dogsService.getOne(term)
    }

    @Post()
    AddDog(@Body() dogDto: DogsDto) {
        return this.dogsService.addOne(dogDto)
    }

    @Delete(':term')
    deleteCat(@Param('term') term: string) {
        return this.dogsService.delete(term)
    }

    @Patch(':id')
    updateCat(@Body() catsDto: DogsDto, @Param('id') id: string) {
        return this.dogsService.update(id, catsDto)
    }
}
