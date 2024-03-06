import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './config/swagger.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // swagger API 문서화 설정
  setupSwagger(app);

  // 데이터 유효성 검사
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // 선언하지 않은 데이터 입력시 400 예외
    transform: true, // 특정 객체 인스턴스로 정상 변환
  }));

  const SERVER_PORT = configService.get<number>('SERVER_PORT');
  await app.listen(SERVER_PORT, () => Logger.log(`Application running on port ${SERVER_PORT}`));
}
bootstrap();
