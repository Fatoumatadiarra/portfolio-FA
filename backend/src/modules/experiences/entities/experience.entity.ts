import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('experiences')
export class Experience {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  title: string;

  @Column({ length: 150 })
  entreprise: string;

  @Column('text')
  description: string;

  @Column({ length: 50 })
  dateDebut: string;

  @Column({ length: 50, nullable: true })
  dateFin: string;

  @Column('simple-array')
  technologies: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
