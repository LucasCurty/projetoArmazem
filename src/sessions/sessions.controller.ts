import { Controller, Post } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsDTO } from './sessions.dto';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  async createSession(){}

}
