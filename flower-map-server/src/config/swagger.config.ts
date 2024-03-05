import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle('Flower Map API Document')
        .setDescription(`
        The Flower Map API description

        현재 프로토타입 버전으로 모든 API에 대한 호출 결과는 더미데이터로 이루어져있습니다.
        API 추가 요청, 변경 등 기타 문의 사항은 Discord back 채널에 남겨주세요.

        writer: 김시영
        `)
        .setVersion('프로토타입')
        .addTag('flower maps')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
}
