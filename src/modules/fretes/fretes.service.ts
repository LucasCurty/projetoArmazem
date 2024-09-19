import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { FreteDTO } from './fretes.dto';

@Injectable()
export class FretesService {
    constructor(private prisma: PrismaService){}

    async createFrete(data: FreteDTO){

        const createFrete = await this.prisma.frete.create({
            data
        })

        return console.log(createFrete)

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
