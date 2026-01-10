import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './core/errors';
import { ResponseIntercetor } from './core/interceptors';
import { ValidationPipe, Version, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  app.enableCors({
    origin: ["http://localhost:4200", "http://localhost:8081"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.use(helmet())

  const config = new DocumentBuilder()
    .setTitle('Courses Service')
    .setDescription('The Courses API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory, {
    swaggerOptions: {
      tagsSorter: "alpha",
      operationsSorter: "alpha",
    }
  })

  const configService = app.get(ConfigService);

  await app.listen(configService.get<number>("PORT") ?? 3000);
}
bootstrap();
