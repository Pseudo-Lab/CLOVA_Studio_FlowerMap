import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './config/swagger.config';
import { ConfigService } from '@nestjs/config';
import { CustomHttpExceptionFilter } from './common/filter/custom-http-exception.filter';
import { BadRequestExceptionFilter } from './common/filter/bad-request-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // CORS OFF
  app.enableCors();

  // 예외 필터
  app.useGlobalFilters(
    new BadRequestExceptionFilter(),
    new CustomHttpExceptionFilter(),
  );

  // swagger API 문서화 설정
  setupSwagger(app);

  // 데이터 유효성 검사
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // 선언하지 않은 데이터 입력시 400 예외
    transform: true, // 특정 객체 인스턴스로 정상 변환
    stopAtFirstError: true, // 유효성 검사 실패 시, 첫번째에서 멈추고 에러 반환
  }));

  const SERVER_PORT = configService.get<number>('SERVER_PORT');
  await app.listen(SERVER_PORT, () => Logger.log(`Application running on port ${SERVER_PORT}`));
}
bootstrap();
