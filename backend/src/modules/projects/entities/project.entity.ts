import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  title: string;

  @Column('text')
  description: string;

  @Column({ default: '' })
  image: string;

  @Column('simple-array')
  technologies: string[];

  @Column({ nullable: true })
  githubUrl: string;

  @Column({ nullable: true })
  demoUrl: string;

  @Column({ default: false })
  featured: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
