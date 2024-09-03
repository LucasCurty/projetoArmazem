import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UserDTO } from './users.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService){}

    async createUser(data: UserDTO){
        const userExist = await this.prisma.user.findFirst({
            where:{
                email: data.email
            }
        })

        if(userExist){
            throw new Error("Email ja esta cadastrado!")
        }

        const user = await this.prisma.user.create({
            data,
        })

        return user ;
    }

    async findAllUsers(){
        return await this.prisma.user.findMany();
    }

    async updateUser(id:string, data:UserDTO){
        const userExist = await this.prisma.user.findUnique({
            where:{
                id,
                email : data.email
            }
        })

        if(!userExist){
            throw new Error("Usuário não encontrado")
        }

        return await this.prisma.user.update({
            data,
            where:{
                id
            }
        })
    }

    async deleteUser(id: string){
        const userExist = await this.prisma.user.findUnique({
            where:{
                id,
            }
        })

        if(!userExist){
            throw new Error("Usuário não encontrado")
        }

        return await this.prisma.user.delete({
            where:{
                id
            }
        })
    }

}
