import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle('Flower Map API Document')
        .setDescription('The Flower Map API description')
        .setVersion('1.0')
        .addTag('flower maps')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
}
