import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwrService: JwtService
    ){}

    async signIn(id:string, pass:string): Promise< {access_token: string}> {
        const userExist = await this.prisma.user.findUnique({
            where:{
                id
            }
        })
        if(!userExist){
            throw new Error("Usuario não encontrado")
        }

        const passwordCorrect = await compare(pass, userExist.password)
        
        if(!passwordCorrect){
            throw new UnauthorizedException();
        }

        const payload = {sub: userExist.id};
        
        return {
            access_token: await this.jwrService.signAsync(payload)
        }

    }
}
