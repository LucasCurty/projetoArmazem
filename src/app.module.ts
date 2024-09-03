import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { NotasModule } from './modules/notas/notas.module';
import { FretesModule } from './modules/fretes/fretes.module';

@Module({
  imports: [ UsersModule, NotasModule, FretesModule],
  controllers: [],
  providers: [],
})
// eslint-disable-next-line prettier/prettier
export class AppModule {}
