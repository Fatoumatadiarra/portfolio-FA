import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export type MessageStatus = 'NON_LU' | 'LU' | 'ARCHIVE';

@Entity('contact_messages')
export class ContactMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  nom: string;

  @Column({ length: 150 })
  email: string;

  @Column({ length: 200, nullable: true })
  sujet: string;

  @Column('text')
  message: string;

  @Column({
    type: 'enum',
    enum: ['NON_LU', 'LU', 'ARCHIVE'],
    default: 'NON_LU',
  })
  statut: MessageStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
