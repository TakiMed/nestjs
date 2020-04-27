import { ValidationPipe, ValidationError } from '@nestjs/common';
import { FallbackExceptionFilter } from './products/filters/fallback.filter';
import { HttpExceptionFilter } from './products/filters/http.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationFilter } from './products/filters/validation.filter';
import { ValidationException } from './products/filters/validation.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.useGlobalFilters(
    new FallbackExceptionFilter(),
    new HttpExceptionFilter(),
    new ValidationFilter()
  ); //order from generic to more specific-vazno
  
  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties:true,
    exceptionFactory:(errors:ValidationError[])=>{
      const messages=errors.map(
        error=>`${error.property} has wrong value${error.value},
        ${Object.values(error.constraints).join(', ')}`
      )
      return new ValidationException(messages);

    }
  }));
  await app.listen(3000);
}
bootstrap();
