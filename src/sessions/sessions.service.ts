import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";
import { SessionsDTO } from "./sessions.dto";

@Injectable()
export class SessionsService{
    constructor(private prisma: PrismaService){}

    async createSessions(data: SessionsDTO){

        const userExist = await this.prisma.user.findUnique({
            where:{
                email: data.user.email
            }
        })
        if(!userExist){
            throw new Error("Não foi possivel acessar, usuário nao encontrado.")
        }
    }
    
}