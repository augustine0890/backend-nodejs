import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
// import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
// import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
// import { ApiKeyGuard } from './common/guards/api-key.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalGuards(new ApiKeyGuard());
  // app.useGlobalInterceptors(new WrapResponseInterceptor());
  // app.useGlobalInterceptors(new TimeoutInterceptor());
  // app.useGlobalInterceptors(
  // new WrapResponseInterceptor(),
  // new TimeoutInterceptor(),
  // );

  const options = new DocumentBuilder()
    .setTitle('ILuvCoffee')
    .setDescription('Coffee Application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
