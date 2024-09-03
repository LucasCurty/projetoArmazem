import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: UserDTO){
    return this.usersService.createUser(data);
  }

  @Get()
  async findAll(){
    return this.usersService.findAllUsers();
  }

  @Put(":id")
  async update(@Param("id") id:string, @Body() data: UserDTO){
    return this.usersService.updateUser(id,data);
  }

  @Delete(":id")
  async delete(@Param("id") id:string){
    return this.usersService.deleteUser(id)
  }
}
