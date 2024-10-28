import { Body, Controller, Param, Post,Get, Put, Delete, UseGuards, Query } from '@nestjs/common';
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

  @Get(':motoristaId')
  async findNotasFrete(@Param('motoristaId') motoristaId: number, @Query('data_saida') data_saida: Date){
    return this.notasService.findNotasinFrete(motoristaId, data_saida);
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
  
  @Get()
  async findByFilters(@Query('numero_nota') numero_nota?: string, @Query('client') client?: string) {
    return this.notasService.findByFilters(numero_nota, client);
  }

  @Delete(":id")
  async delete(@Param("id") id:number){
    return this.notasService.deleteNota(id)
  }
}
