import { BadRequestException, Body, Get, Injectable, NotFoundException, Param, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { PostsDto } from './dtos/posts.dto';
import { Posts } from './entities/posts.entity';

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(Posts)
        private readonly postsRepository: Repository<Posts>
    ) {

    }

    async getAll() {
        const posts = await this.postsRepository.find()

        return posts
    }

    async getOne(id: string) {
        const post = await this.postsRepository.findOneBy({ id })

        if (!post) {
            throw new NotFoundException('Post not found')
        }

        return post
    }

    async addOne(newPost: PostsDto) {

        try {
            const post = {
                id: uuid(),
                ...newPost
            }
            const savedPost = this.postsRepository.create(post);

            await this.postsRepository.save(savedPost)

            return savedPost

        } catch (error) {
            if (error.errno === 1452) {
                throw new NotFoundException('Usuario no encontrado')
            } else {
                console.log(error);
                throw new NotFoundException('Error al crear el post [ver consola para mas detalle]')
            }
        }

    }

    async delete(term: string) {

        const deleteResponse = await this.postsRepository.delete(term)

        if (deleteResponse.affected === 0) {
            throw new BadRequestException('Post no encontrado')
        }

        return `Post con ID: [${term}] eliminado correctamente`;

    }

    async update(id: string, newPost: PostsDto) {

        const post = await this.postsRepository.preload({
            id: id,
            ...newPost
        });

        if (!post) throw new NotFoundException(`Post con  id [${id}] no encontrado`);

        try {
            await this.postsRepository.save(post);
            return post;

        } catch (error) {
            console.log(error);
            throw new BadRequestException('Error al crear post [ver consola para mas detalles]')
        }

    }

}
