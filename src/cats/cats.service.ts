import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CatsDto } from './dtos/cats.dto';
import { Cats } from './entities/cats.entity';

@Injectable()
export class CatsService {

    constructor(
        @InjectRepository(Cats)
        private catsRepository: Repository<Cats>
    ) {

    }

    async getAll() {
        return await this.catsRepository.find()
    }

    async getOne(term: string) {
        const cat = await this.catsRepository.findOneBy({ id: term })

        if (!cat) {
            throw new NotFoundException('Cat not found')
        }

        return cat;
    }

    async addOne(newCat: CatsDto) {

        try {

            const cat = {
                id: uuid(),
                ...newCat
            }

            const saveCat = this.catsRepository.create(cat)
            await this.catsRepository.save(saveCat)

            return cat;

        } catch (error) {
            if (error.errno === 1452) {
                throw new NotFoundException('Usuario no encontrado')
            } else {
                console.log(error);
                throw new NotFoundException('Error al crear el gato [ver consola para mas detalle]')
            }
        }
    }

    async delete(term: string) {

        const deleteResponse = await this.catsRepository.delete(term)

        if (deleteResponse.affected === 0) {
            throw new BadRequestException('Gato no encontrado')
        }

        return `Gato con ID: [${term}] eliminado correctamente`;
    }

    async update(id: string, newCat: CatsDto) {

        const cat = await this.catsRepository.preload({
            id: id,
            ...newCat
        });

        if (!cat) throw new NotFoundException(`Gato con  id [${id}] no encontrado`);

        try {
            await this.catsRepository.save(cat);
            return cat;

        } catch (error) {
            console.log(error);
            throw new BadRequestException('Error al crear gato [ver consola para mas detalles]')
        }

    }

    async getPetByOwner(ownerId: string) {
        const pets = await this.catsRepository.find({
            where: {
                owner: ownerId
            }
        })

        return pets
    }

}
