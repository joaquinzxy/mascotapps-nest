import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsDto } from './dtos/cats.dto';

@Controller('cats')
export class CatsController {

    constructor(
        private readonly catsService: CatsService
    ) {

    }

    @Get()
    getAllCats() {
        return this.catsService.getAll()
    }

    @Get(':term')
    getOneCat(@Param('term') term: string) {
        return this.catsService.getOne(term)
    }

    @Post()
    addCat(@Body() catsDto: CatsDto) {
        return this.catsService.addOne(catsDto)
    }

    @Delete(':term')
    deleteCat(@Param('term') term: string) {
        return this.catsService.delete(term)
    }

    @Patch(':id')
    updateCat(@Body() catsDto: CatsDto, @Param('id') id: string) {
        return this.catsService.update(id, catsDto)
    }

    @Get('owner/:ownerId')
    getCatsByOwner(@Param('ownerId') ownerId: string) {
        return this.catsService.getPetByOwner(ownerId)
    }
}
