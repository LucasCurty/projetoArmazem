import { Body, Controller, Param, Post,Get, Put, Delete, UseGuards } from '@nestjs/common';
import { NotasService } from './notas.service';
import { NotasDTO } from './notas.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('notas')
@UseGuards(AuthGuard('jwt'))
export class NotasController {
  constructor(private readonly notasService: NotasService) {}

  @Post()
  async create(@Body() data: NotasDTO[]){
    return this.notasService.createNota(data);
  }

  @Get()
  async findAll(){
    return this.notasService.findAllNotas();
  }
  
  @Get(':id')
  async findOneNote(@Param("id") id: number){
    return this.notasService.finOneNote(id)
  }
  

  @Put(":id")
  async update(@Param("id") id:number, @Body() data: NotasDTO){
    return this.notasService.updateNota(id,data);
  }

  @Delete(":id")
  async delete(@Param("id") id:number){
    return this.notasService.deleteNota(id)
  }
}
