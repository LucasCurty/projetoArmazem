import { Controller, Post,Get, Put, Delete, Body, Param, HttpCode } from '@nestjs/common';
import { FretesService } from './fretes.service';
import { FreteDTO } from './fretes.dto';

@Controller('fretes')
export class FretesController {
  constructor(private readonly fretesService: FretesService) {}

  @Post()
  @HttpCode(204)
  async create(@Body() data: FreteDTO){
    return this.fretesService.createFrete(data);
  }

  @Get()
  async findAll(){
    return this.fretesService.findAllFretes();
  }

  @Put(":id")
  async update(@Param("id") id:string, @Body() data: FreteDTO){
    return this.fretesService.updateFrete(id,data);
  }

  @Delete(":id")
  async delete(@Param("id") id:string){
    return this.fretesService.deleteFrete(id)
  }
}
