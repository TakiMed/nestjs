import { FallbackExceptionFilter } from './poruducts/filters/fallback.filter';
import { HttpExceptionFilter } from './poruducts/filters/http.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new FallbackExceptionFilter(),
    new HttpExceptionFilter()); //order from generic to more specific-vazno
  await app.listen(3000);
}
bootstrap();
