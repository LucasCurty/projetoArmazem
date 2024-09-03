import { Module } from '@nestjs/common';
import { FretesService } from './fretes.service';
import { FretesController } from './fretes.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [FretesController],
  providers: [FretesService,PrismaService],
})
export class FretesModule {}
