import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { BookBuilderModule } from './book-builder/book-builder.module';

const ENV = process.env.NODE_ENV;
//TODO make it as lazy load
@Module({
  imports: [
    BookBuilderModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
