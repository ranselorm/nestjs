import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';

@Controller('messages')
export class MessagesController {
  @Get()
  listMesssages() {
    return 'this is the list messages route';
  }

  @Post()
  createMesssage(@Body() body: CreateMessageDto) {
    console.log(body, 'req body');
  }

  @Get('/:id')
  getMesssage(@Param('id') id: string) {
    console.log(id, 'params');
  }
}
