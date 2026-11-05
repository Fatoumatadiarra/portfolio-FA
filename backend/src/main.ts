import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('PortfolioBackend');
  const app = await NestFactory.create(AppModule);

  // Activation CORS pour le frontend React Vite
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Validation globale des DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  const port = process.env.PORT || 3001;
  await app.listen(port);
  logger.log(`🚀 Serveur NestJS démarré avec succès sur : http://localhost:${port}`);
  logger.log(`📡 Endpoints disponibles :`);
  logger.log(`   - Projets : http://localhost:${port}/projects`);
  logger.log(`   - Compétences : http://localhost:${port}/skills`);
  logger.log(`   - Expériences : http://localhost:${port}/experiences`);
  logger.log(`   - Formulaire Contact : http://localhost:${port}/contact`);
  logger.log(`   - Messages (Admin) : http://localhost:${port}/contact/messages`);
  logger.log(`   - Auth Admin : http://localhost:${port}/auth/login`);
}

bootstrap();
