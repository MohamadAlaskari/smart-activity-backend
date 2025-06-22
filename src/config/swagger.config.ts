/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Setup Swagger Documentation
 * @param app NestJS Application instance
 */
export function setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle('Smart Activity Backend')
        .setDescription('API Documentation for the Smart Activity App')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
}
