import { Controller, Post,Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { FretesService } from './fretes.service';
import { FreteDTO } from './fretes.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('fretes')
@UseGuards(AuthGuard('jwt'))
export class FretesController {
  constructor(private readonly fretesService: FretesService) {}

  @Post()
  async create(@Body() data: FreteDTO){
    return this.fretesService.createFrete(data);
  }

  @Get()
  async findAll(){
    return this.fretesService.findAllFretes();
  }

  @Put(":freteId")
  async update(@Param("freteId") freteId:number, @Body() data: FreteDTO){
    return this.fretesService.updateFrete(freteId,data);
  }

  @Delete(":id")
  async delete(@Param("id") id:number){
    return this.fretesService.deleteFrete(+id)
  }
}
