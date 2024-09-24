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
    async findAllNotas(){
        return await this.prisma.nota.findMany();
    }

    async finOneNote(nota: number){
        return await this.prisma.nota.findMany({
              where:{
                numero_nota:{
                  equals: nota  
                }
              }
          })
          }

    async updateNota(id: number, data:NotasDTO){
        const notaExist = await this.prisma.nota.findUnique({
            where:{
                id
            }
        })

        if(!notaExist){
            throw new Error("Nota não encontrada")
        }

        return await this.prisma.nota.update({
            data,
            where:{
                id
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
}
