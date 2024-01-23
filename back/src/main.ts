import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    allowedHeaders: 'Authorization, *',
  });

  await app.listen(process.env.PORT || 4443);
}
bootstrap();
