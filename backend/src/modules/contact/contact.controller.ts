import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactStatusDto } from './dto/update-contact-status.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  sendMessage(@Body() createDto: CreateContactDto) {
    return this.contactService.create(createDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('messages')
  findAllMessages() {
    return this.contactService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('messages/:id')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateContactStatusDto,
  ) {
    return this.contactService.updateStatus(id, dto.statut);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('messages/:id')
  removeMessage(@Param('id', ParseIntPipe) id: number) {
    return this.contactService.remove(id);
  }
}
