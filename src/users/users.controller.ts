import { Controller, Get, Post, Body, Param, Put, Delete, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getUsers() {
        return await this.usersService.getUsers();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        if (isNaN(Number(id))) {
            throw new BadRequestException('ID inválido');
        }
        return await this.usersService.findOne(Number(id));
    }

    @Post()
    async createUser(@Body() body: { name: string; age: number; mail: string }) {
        if (!body.name || !body.age || !body.mail) {
            throw new BadRequestException('El nombre, la edad y el correo son obligatorios');
        }
        return await this.usersService.createUser(body.name, body.age, body.mail);
    }

    @Put(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() body: { name?: string; age?: number; mail?: string }
    ) {
        if (isNaN(Number(id))) {
            throw new BadRequestException('ID inválido');
        }
        return await this.usersService.updateUser(Number(id), body);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        if (isNaN(Number(id))) {
            throw new BadRequestException('ID inválido');
        }
        return await this.usersService.deleteUser(Number(id));
    }
}