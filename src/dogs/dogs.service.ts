import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { DogsDto } from './dtos/dogs.dto';
import { Dogs } from './entities/dogs.entity';

@Injectable()
export class DogsService {

    constructor(
        @InjectRepository(Dogs)
        private readonly dogsRepository: Repository<Dogs>
    ) {

    }

    async getAll() {
        const dogs = await this.dogsRepository.find()

        return dogs;
    }

    async getOne(term: string) {
        const dog = await this.dogsRepository.findOneBy({ id: term })

        if (!dog) {
            throw new NotFoundException('Dog not found')
        }

        return dog
    }

    async addOne(newDog: DogsDto) {

        try {

            const dog = {
                id: uuid(),
                ...newDog
            }

            const saveDog = this.dogsRepository.create(dog)

            await this.dogsRepository.save(saveDog)

            return saveDog;

        } catch (error) {
            if (error.errno === 1452) {
                throw new NotFoundException('Usuario no encontrado')
            } else {
                console.log(error);
                throw new NotFoundException('Error al crear el perro [ver consola para mas detalle]')
            }
        }

    }

    async delete(term: string) {

        const deleteResponse = await this.dogsRepository.delete(term)

        if (deleteResponse.affected === 0) {
            throw new BadRequestException('Perro no encontrado')
        }

        return `Perro con ID: [${term}] eliminado correctamente`;

    }

    async update(id: string, newDog: DogsDto) {

        const dog = await this.dogsRepository.preload({
            id: id,
            ...newDog
        });

        if (!dog) throw new NotFoundException(`Perro con  id [${id}] no encontrado`);

        try {
            await this.dogsRepository.save(dog);
            return dog;

        } catch (error) {
            console.log(error);
            throw new BadRequestException('Error al crear perro [ver consola para mas detalles]')
        }

    }

}
