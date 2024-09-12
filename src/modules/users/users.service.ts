import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UserDTO } from './users.dto';
import { hash, compare } from 'bcrypt';
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
        
        const hashedPassword = await hash(data.password, 8)

        const user = await this.prisma.user.create({
                data:{
                    name: data.name,
                    email:data.email,
                    password:hashedPassword
                }
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

        if(userExist && userExist.id !== id){
            throw new Error("Este e-mail já esta em uso.")
        }

        userExist.name = data.name ?? userExist.name;
        userExist.email = data.email ?? userExist.email;

        if(data.password && !data.oldPassword){
            throw new Error("Você precisa informar a senha antiga para definir a nova senha");
        }

        if(data.password && data.oldPassword){
            const checkOldPassword = await compare(data.oldPassword, userExist.password);
            

            if(!checkOldPassword){
                return console.log(checkOldPassword)
                // throw new Error("Senhas não conferem!");
            }

            // data.password = await hash(data.password, 8);
            
        }

        return data
        // return await this.prisma.user.update({
        //     data:{
        //         name:data.name,
        //         email: data.email,
        //         password: data.password,
        //         avatar:data.avatar
        //     },
        //     where:{
        //         id
        //     }
        // })
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
