import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from '../users/users.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwrService: JwtService
    ){}

    async signIn(data:UserDTO): Promise< {user:{},token: string}> {
        const userExist = await this.prisma.user.findUnique({
            where:{
                email:data.email
            }
        })
        if(!userExist){
            throw new Error("Usuario não encontrado")
        }

        const passwordCorrect = await compare(data.password, userExist.password)
        
        if(!passwordCorrect){
            throw new UnauthorizedException();
        }

        const payload = {sub: userExist.id};
        const { password, ...user} = userExist
        
        return {
            user,
            token: await this.jwrService.signAsync(payload)
        }

    }
}
