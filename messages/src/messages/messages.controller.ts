import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Injectable()
@Controller('messages')
export class MessagesController {
  constructor(public messagesService: MessagesService) {}

  @Get()
  listMesssages() {
    return this.messagesService.findAll();
  }

  @Post()
  createMesssage(@Body() body: CreateMessageDto) {
    return this.messagesService.create(body.content);
  }

  @Get('/:id')
  async getMesssage(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);

    if (!message) {
      throw new NotFoundException('message not found!');
    }
    return message;
  }
}
