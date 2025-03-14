import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    // Obtener todos los usuarios
    async getUsers() {
        return await this.userRepository.find();
    }

    // Obtener un usuario por ID
    async findOne(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return user;
    }

    // Crear un usuario
    async createUser(name: string, age: number, mail: string) {
        if (!name || !age || !mail) {
            throw new BadRequestException('El nombre, la edad y el correo son obligatorios');
        }

        const existingUser = await this.userRepository.findOne({ where: { mail } });
        if (existingUser) {
            throw new BadRequestException('Ya existe un usuario con este correo');
        }

        const newUser = this.userRepository.create({ name, age, mail });
        return await this.userRepository.save(newUser);
    }

    // Actualizar un usuario
    async updateUser(id: number, data: { name?: string; age?: number; mail?: string }) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }

        // Verificar si el correo es único al actualizar
        if (data.mail) {
            const existingUser = await this.userRepository.findOne({ where: { mail: data.mail } });
            if (existingUser && existingUser.id !== id) {
                throw new BadRequestException('Ya existe un usuario con este correo');
            }
        }

        await this.userRepository.update(id, data);
        return await this.userRepository.findOne({ where: { id } });
    }

    // Eliminar un usuario
    async deleteUser(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return await this.userRepository.delete(id);
    }
}