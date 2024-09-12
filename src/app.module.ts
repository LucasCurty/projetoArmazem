import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { NotasModule } from './modules/notas/notas.module';
import { FretesModule } from './modules/fretes/fretes.module';
import { SessionsModule } from './sessions/sessions.module';

@Module({
  imports: [ UsersModule, NotasModule, FretesModule, SessionsModule],
  controllers: [],
  providers: [],
})
// eslint-disable-next-line prettier/prettier
export class AppModule {}
