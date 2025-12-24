import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './core/errors';
import { ResponseIntercetor } from './core/interceptors';
import { ValidationPipe, Version, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    skipMissingProperties: false,
  }));
  app.useGlobalInterceptors(new ResponseIntercetor());
  app.useGlobalFilters(new CustomExceptionFilter());
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1'],
  })

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
