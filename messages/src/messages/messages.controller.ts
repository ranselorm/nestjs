import { Controller, Get, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @Get()
  listMesssages() {
    return 'this is the list messages route';
  }

  @Post()
  createMesssage() {
    return 'create a message route';
  }

  @Get('/:id')
  getMesssage() {
    return 'this is the get a single message route';
  }
}
