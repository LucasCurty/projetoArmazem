import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../../database/PrismaService'
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';

@Module({
  imports: [
    JwtModule.register({
      global:true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn:'60s'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})

export class AuthModule {}