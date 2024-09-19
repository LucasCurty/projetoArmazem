import { Controller, Post,Get, Put, Delete, Body, Param, HttpCode, UseGuards } from '@nestjs/common';
import { FretesService } from './fretes.service';
import { FreteDTO } from './fretes.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('fretes')
@UseGuards(AuthGuard('jwt'))
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
  async update(@Param("id") id:number, @Body() data: FreteDTO){
    return this.fretesService.updateFrete(id,data);
  }

  @Delete(":id")
  async delete(@Param("id") id:number){
    return this.fretesService.deleteFrete(id)
  }
}
