import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';

  import { JwtService } from '@nestjs/jwt';
  import { jwtConstants } from './auth.constants';
  import { Request } from 'express';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException({
          "message": "Usuario sem acesso!!",
          "error": "Permissão negada! favor, verificar com o administrador",
        });
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: jwtConstants.secret
          }
        );
        
        
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException({
          "message": "Alguma coisa essada aconteceu!",
          "error": "Verifique com seu administrador",
        });
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }