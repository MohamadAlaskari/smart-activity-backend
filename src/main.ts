import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import * as express from 'express';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // *Globale Middleware*
    //Auto-Validation
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new GlobalExceptionFilter());
    app.enableCors();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    // Swagger API-Dokumentation einrichten
    setupSwagger(app);

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
