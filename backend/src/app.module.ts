import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from './modules/projects/entities/project.entity';
import { Skill } from './modules/skills/entities/skill.entity';
import { Experience } from './modules/experiences/entities/experience.entity';
import { ContactMessage } from './modules/contact/entities/contact-message.entity';
import { User } from './modules/auth/entities/user.entity';

import { ProjectsModule } from './modules/projects/projects.module';
import { SkillsModule } from './modules/skills/skills.module';
import { ExperiencesModule } from './modules/experiences/experiences.module';
import { ContactModule } from './modules/contact/contact.module';
import { AuthModule } from './modules/auth/auth.module';
import { SeedService } from './database/seed.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: Number(config.get<number>('DB_PORT', 3306)),
        username: config.get<string>('DB_USERNAME', 'root'),
        password: config.get<string>('DB_PASSWORD', ''),
        database: config.get<string>('DB_DATABASE', 'portfolio_db'),
        entities: [Project, Skill, Experience, ContactMessage, User],
        synchronize: true, // Crée et met à jour automatiquement les tables en dev
        logging: false,
        retryAttempts: 2,
        retryDelay: 1000,
      }),
    }),
    TypeOrmModule.forFeature([Project, Skill, Experience]),
    ProjectsModule,
    SkillsModule,
    ExperiencesModule,
    ContactModule,
    AuthModule,
  ],
  providers: [SeedService],
})
export class AppModule {}
