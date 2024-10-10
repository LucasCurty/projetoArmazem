import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { FreteDTO } from './fretes.dto';

@Injectable()
export class FretesService {
    constructor(private prisma: PrismaService){}

    async createFrete(data: FreteDTO) {
        const notas = await this.prisma.nota.findMany({
            where:{
                numero_nota: data.notas.numero_nota
            }
        })
        const createFrete = await this.prisma.frete.create({
          data: {
            peso_total: data.peso_total,
            frete_empresa: Number(data.frete_empresa), 
            frete_saida_motorista: Number(data.frete_saida_motorista),
            quantidade_entregas: Number(data.quantidade_entregas),
            motorista: {
              connect: data.motorista as any
            },
            notas: {
                connect: notas
            }
        }

        });

        return createFrete
      }        
      
    async findAllFretes(){
        return await this.prisma.frete.findMany();
    }

    async updateFrete(id: number, data: FreteDTO){
        const freteExist = await this.prisma.frete.findFirst({
            where:{
                id,
            }
        })
        
        if(!freteExist){
            throw new Error("Frete não encontrado")
        }

        // return await this.prisma.frete.update({
        //     data,
        //     where:{
        //        id
        //     }
        // })
    }

    async deleteFrete(id: number){
        const freteExist = await this.prisma.frete.findUnique({
            where:{
                id
            }
        })
        if(!freteExist){
            throw new Error("Frete não pode ser apagado, nao existe")
        }
        return await this.prisma.frete.delete({
            where:{
                id
            }
        })
    }
}
