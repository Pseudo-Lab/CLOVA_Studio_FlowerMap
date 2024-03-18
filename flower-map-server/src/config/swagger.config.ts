import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle('Flower Map API Document')
        .setDescription(`
        미완성 API에 대한 호출 결과는 더미데이터로 이루어져있습니다.
        API 추가 요청, 변경 등 기타 문의 사항은 Discord back 채널에 남겨주세요.

        ${process.env.BUILD_DATE || new Date().toISOString().slice(0, 10)} 김시영
    `)
        .setVersion('프로토타입')
        .addTag('flower maps')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1/docs', app, document);
}
