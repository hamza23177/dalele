/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as dotenv from 'dotenv';

async function bootstrap() {
  // تحميل متغيرات البيئة
  dotenv.config();

  // إنشاء التطبيق مع دعم Express المخصص
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // تقديم الصور الموجودة في مجلد "images" بشكل علني
  app.useStaticAssets(join(__dirname, '..', 'images'), {
    prefix: '/images/',
  });

  // الاستماع على المنفذ المحدد في .env أو 3000
  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`Server is running on http://localhost:${port}`);
}
bootstrap();