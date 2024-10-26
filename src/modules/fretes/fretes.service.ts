import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { FreteDTO } from './fretes.dto';

@Injectable()
export class FretesService {
    constructor(private prisma: PrismaService){}

    async createFrete(data: FreteDTO) {
        console.log(data.notas)
        const createFrete = await this.prisma.frete.create({
          data: {
            peso_total: data.peso_total,
            frete_empresa: Number(data.frete_empresa), 
            frete_saida_motorista: Number(data.frete_saida_motorista),
            quantidade_entregas: Number(data.quantidade_entregas),
            motorista: { 
                connect: {id: data.motoristaId}
             },
            notas:{
                connect :  data.notas.map(notaID => ({id: notaID.id})),                   
                
            } 
            

        }});

        return createFrete
      }        
      
    async findAllFretes(){
        return await this.prisma.frete.findMany();
    }

    async updateFrete(idMotorista: number, data: FreteDTO){
        const freteExist = await this.prisma.frete.findFirst({
            where:{
                id: Number(idMotorista)
            }
        })
        
        if(!freteExist){
            throw new Error("Frete não encontrado")
        }
        return await this.prisma.frete.update({
            where:{ id: Number(idMotorista) },
            data:{
                ...data,
                frete_empresa: Number(data?.frete_empresa),
                frete_saida_motorista: Number(data?.frete_saida_motorista),
                km_inicial: Number(data?.km_inicial),
                km_final: Number(data?.km_final)
            } as any
        })
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
