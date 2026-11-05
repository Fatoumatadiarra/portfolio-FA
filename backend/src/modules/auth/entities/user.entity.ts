import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 100 })
  username: string;

  @Column()
  password: string;

  @Column({ default: 'ADMIN' })
  role: string;

  @CreateDateColumn()
  createdAt: Date;
}
