import { ValidationPipe, ValidationError } from '@nestjs/common';
import { FallbackExceptionFilter } from './poruducts/filters/fallback.filter';
import { HttpExceptionFilter } from './poruducts/filters/http.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationFilter } from './poruducts/filters/validation.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new FallbackExceptionFilter(),
    new HttpExceptionFilter(),
    new ValidationFilter()); //order from generic to more specific-vazno
  
  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties:true,
    exceptionFactory:(errors:ValidationError[])=>{
      const messages=errors.map(
        error=>`${error.property} has wrong value${error.value},
        ${Object.values(error.constraints).join(', ')}`
      )

    }
  }));
  await app.listen(3000);
}
bootstrap();
