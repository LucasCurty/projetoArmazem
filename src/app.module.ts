import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { NotasModule } from './modules/notas/notas.module';
import { FretesModule } from './modules/fretes/fretes.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ UsersModule, NotasModule, FretesModule, AuthModule],
  controllers: [],
  providers: [],
})
// eslint-disable-next-line prettier/prettier
export class AppModule {}
