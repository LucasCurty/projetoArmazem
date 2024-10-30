import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { FreteDTO } from './fretes.dto';

@Injectable()
export class FretesService {
    constructor(private prisma: PrismaService){}

    async createFrete(data: FreteDTO) {
        // Verificação opcional
        const motorista = await this.prisma.motorista.findUnique({
            where: {
                cpf_cnpj: data.motorista.cpf_cnpj
            }
        });
        
        if (!motorista) {
            throw new Error('Motorista não encontrado');
        }
        
        const createFrete = await this.prisma.frete.create({
          data: {
            data_frete: new Date(data.data_frete),
            peso_total: Number(data.peso_total),  
            frete_empresa: Number(data.frete_empresa),
            frete_saida_motorista: Number(data.frete_saida_motorista),
            quantidade_entregas: Number(data.quantidade_entregas),
            km_inicial: Number(data.km_inicial),
            km_final: Number(data.km_final),    
            motorista: { 
                connect: {cpf_cnpj: data.motorista.cpf_cnpj }
             },
            notas:{
                connect :  data.notas.map(notaID => ({id: notaID.id})),                   
                
            } 
            

        }});

        return createFrete
      }        
      
    async findAllFretes(){
        return await this.prisma.frete.findMany({
            include:{
                motorista: true,
                notas: true
            }
        });
    }

    async updateFrete(freteId: number, data: FreteDTO){
        // Verifica se o frete existe
        const freteExist = await this.prisma.frete.findFirst({
            where:{
                id: Number(freteId) 
            }
        });
        
        if(!freteExist){
            throw new Error("Frete não encontrado");
        }

        // Verifica se o novo motorista existe
        const motoristaExist = await this.prisma.motorista.findUnique({
            where: {
                cpf_cnpj: data.motorista.cpf_cnpj
            }
        });

        if(!motoristaExist){
            throw new Error("Motorista não encontrado");
        }

        // Atualiza o frete com o novo motorista
        return await this.prisma.frete.update({
            data:{
                peso_total: Number(data.peso_total),
                frete_empresa: Number(data.frete_empresa),
                frete_saida_motorista: Number(data.frete_saida_motorista),
                quantidade_entregas: Number(data.quantidade_entregas),
                km_inicial: Number(data.km_inicial),
                km_final: Number(data.km_final),
                motorista: {
                    connect: {cpf_cnpj: motoristaExist.cpf_cnpj}
                }
            },
            where:{ id: Number(freteId)}
        });
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
