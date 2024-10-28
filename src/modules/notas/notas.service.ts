import { Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { NotasDTO } from './notas.dto';


@Injectable()
export class NotasService {
    constructor(private prisma: PrismaService){}

    async createNota(data: NotasDTO[]){
        
        return await this.prisma.nota.createMany({
            data
        })

        .then(res => {
            console.log(`Tudo deu certo, cadastrado com sucesso: [${res}]`)
        })
        .catch(err =>{
            console.log(`Erro no processo, cadastrado não realizado: [${err}]`)
        })

    }

   async findNotasinFrete(idMotorista: number, data_saida: Date) {
    const notasFrete = await this.prisma.nota.findMany({
      where: {
          motoristaId: Number(idMotorista), 
          data_saida: { 
            equals: data_saida  
        }
      },

    });

        return notasFrete;
}

    async findAllNotas(){
        return await this.prisma.nota.findMany({
            include:{
                motorista:true
            }
        })
    }

    async finOneNote(id: number){
        return await this.prisma.nota.findMany({
            where:{ motoristaId: id},
            include:{
                motorista: true
            }
              
        })
    }


    async updateNota(id: number, data:NotasDTO){
        
        const notaExist = await this.prisma.nota.findUnique({
            where:{ 
                id: Number(id)
             }
        })

        if(!notaExist){
            throw new Error("Nota não encontrada")
        }

        return await this.prisma.nota.update({
            where:{ id: Number(id) },
            data:{
                ...data,
                data_saida: data?.data_saida,
                motoristaId: data?.motoristaId,
                tipo_produto: data?.tipo_produto,
                observacoes: data?.observacoes,
            }
        })
    }

    async deleteNota(id:number){
        const userExist = await this.prisma.nota.findUnique({
            where:{
                id,
            }
        })

        if(!userExist){
            throw new Error("Usuário não encontrado")
        }

        return await this.prisma.nota.delete({
            where:{
                id
            }
        })
    }

    async findByFilters(numero_nota?: string, client?: string) {
        const where = {};
        
        if (numero_nota) {
            where['numero_nota'] = numero_nota;
        }
        
        if (client) {
            where['client'] = client;
        }

        const notas = await this.prisma.nota.findMany({
            where,
            include: {
                motorista: true
            }
        });

        return notas;
    }
}
