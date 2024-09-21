import { Module } from '@nestjs/common';
import { MotoristaService } from './motorista.service';
import { MotoristaController } from './motorista.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [MotoristaController],
  providers: [MotoristaService, PrismaService],
})
export class MotoristaModule {}
