import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../../database/PrismaService'
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global:true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn:'30d'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy],
})

export class AuthModule {}
