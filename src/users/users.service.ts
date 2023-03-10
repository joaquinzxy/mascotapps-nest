import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UsersDto } from './dtos/users.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>
    ) {
    }

    async getAll() {
        const users = await this.usersRepository.find();

        return users;
    }

    async getOne(term: string) {

        const user = await this.usersRepository.findOneBy({ id: term })

        return user;
    }

    async addOne(newUser: UsersDto) {

        try {
            const user = {
                id: uuid(),
                ...newUser
            }
            const saveUser = this.usersRepository.create(user)

            await this.usersRepository.save(saveUser)

            return user;

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

        const deleteResponse = await this.usersRepository.delete(term)

        if (deleteResponse.affected === 0) {
            throw new BadRequestException('Usuario no encontrado')
        }

        return `Usuario con ID: [${term}] eliminado correctamente`;

    }

    async update(id: string, newUser: UsersDto) {

        const user = await this.usersRepository.preload({
            id: id,
            ...newUser
        });

        if (!user) throw new NotFoundException(`User con  id [${id}] no encontrado`);

        try {
            await this.usersRepository.save(user);
            return user;

        } catch (error) {
            console.log(error);
            throw new BadRequestException('Error al crear usuario [ver consola para mas detalles]')
        }

    }
}
