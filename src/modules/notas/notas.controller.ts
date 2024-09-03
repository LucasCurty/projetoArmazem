import { Body, Controller, Param, Post,Get, Put, Delete } from '@nestjs/common';
import { NotasService } from './notas.service';
import { NotasDTO } from './notas.dto';

@Controller('notas')
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

  @Put(":numero_nota")
  async update(@Param("numero_nota") numero_nota:string, @Body() data: NotasDTO){
    return this.notasService.updateNota(numero_nota,data);
  }

  @Delete(":numero_nota")
  async delete(@Param("numero_nota") numero_nota:string){
    return this.notasService.deleteNota(numero_nota)
  }
}
