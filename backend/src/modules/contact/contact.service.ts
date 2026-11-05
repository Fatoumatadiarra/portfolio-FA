import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactMessage, MessageStatus } from './entities/contact-message.entity';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactMessage)
    private readonly contactRepository: Repository<ContactMessage>,
  ) {}

  async create(dto: CreateContactDto): Promise<{ success: boolean; message: string; id: number }> {
    const msg = this.contactRepository.create(dto);
    const saved = await this.contactRepository.save(msg);
    return {
      success: true,
      message: 'Message reçu avec succès. Merci !',
      id: saved.id,
    };
  }

  async findAll(): Promise<ContactMessage[]> {
    return this.contactRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<ContactMessage> {
    const msg = await this.contactRepository.findOne({ where: { id } });
    if (!msg) {
      throw new NotFoundException(`Message #${id} introuvable`);
    }
    return msg;
  }

  async updateStatus(id: number, statut: MessageStatus): Promise<ContactMessage> {
    const msg = await this.findOne(id);
    msg.statut = statut;
    return this.contactRepository.save(msg);
  }

  async remove(id: number): Promise<void> {
    const msg = await this.findOne(id);
    await this.contactRepository.remove(msg);
  }
}
