import { Injectable } from '@nestjs/common';
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

    async updateNota(numero_nota:string, data:NotasDTO){
        const notaExist = await this.prisma.nota.findUnique({
            where:{
                numero_nota
            }
        })

        if(!notaExist){
            throw new Error("Nota não encontrada")
        }

        return await this.prisma.nota.update({
            data,
            where:{
                numero_nota
            }
        })
    }

    async deleteNota(numero_nota: string){
        const userExist = await this.prisma.nota.findUnique({
            where:{
                numero_nota,
            }
        })

        if(!userExist){
            throw new Error("Usuário não encontrado")
        }

        return await this.prisma.nota.delete({
            where:{
                numero_nota
            }
        })
    }
}
