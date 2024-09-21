import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MotoristaService } from './motorista.service';
import { motoristaDTO } from './motorista.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('motorista')
@UseGuards(AuthGuard('jwt'))
export class MotoristaController {
  constructor(private readonly motoristaService: MotoristaService) {}

  @Post()
  create(@Body() createMotoristaDto: motoristaDTO) {
    return this.motoristaService.createMotorista(createMotoristaDto);
  }

  @Get()
  findAll() {
    return this.motoristaService.findAllMotorista();
  }

  @Get(':placa')
  findOne(@Param('placa') placa: string) {
    return this.motoristaService.findOneMotorista(placa);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMotoristaDto: motoristaDTO) {
    return this.motoristaService.updateMotorsita(+id, updateMotoristaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.motoristaService.deleteMotorista(+id);
  }
}
