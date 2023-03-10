import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsDto } from './dtos/posts.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {

    constructor(
        private readonly postsService: PostsService
    ) {

    }

    @Get()
    getAllDogs() {
        return this.postsService.getAll()
    }

    @Get(':term')
    getOneDog(@Param('term') term: string) {
        return this.postsService.getOne(term)
    }

    @Post()
    AddDog(@Body() postDTO: PostsDto) {
        return this.postsService.addOne(postDTO)
    }

    @Delete(':term')
    deleteCat(@Param('term') term: string) {
        return this.postsService.delete(term)
    }

    @Patch(':id')
    updateCat(@Body() postDto: PostsDto, @Param('id') id: string) {
        return this.postsService.update(id, postDto)
    }
}
