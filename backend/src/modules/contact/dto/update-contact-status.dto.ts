import { IsIn } from 'class-validator';
import type { MessageStatus } from '../entities/contact-message.entity';

export class UpdateContactStatusDto {
  @IsIn(['NON_LU', 'LU', 'ARCHIVE'])
  statut: MessageStatus;
}
