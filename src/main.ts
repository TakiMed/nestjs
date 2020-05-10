import { UsersModule } from './users/users.module';
import { ValidationPipe, ValidationError } from '@nestjs/common';
import { FallbackExceptionFilter } from './products/filters/fallback.filter';
import { HttpExceptionFilter } from './products/filters/http.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationFilter } from './products/filters/validation.filter';
import { ValidationException } from './products/filters/validation.exception';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import { ProductsModule } from './products/products.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  //swagger products setup
  const prodOptions=new DocumentBuilder()
  .setTitle('Products api')
  .setDescription('Test products')
  .setVersion('1.0')
  .addBearerAuth(
      { type: 'http',
      scheme: 'bearer',
      bearerFormat: 'jwt'},'jwt',
  )
  .build();
  /*
  const prodDocument=SwaggerModule.createDocument(app,prodOptions,{
    include:[ProductsModule]
  });
  SwaggerModule.setup('api/products', app, prodDocument)
  */
  //swagger for users setup
  const uOptions=new DocumentBuilder()
  .setTitle('Users api')
  .setDescription('Test users')
  .setVersion('1.0')
  .build();
  const uDocument=SwaggerModule.createDocument(app,uOptions,{
    include:[UsersModule]
  });
  SwaggerModule.setup('/api/users', app,uDocument)
  
  
  app.useGlobalFilters(
    new FallbackExceptionFilter(),
    new HttpExceptionFilter(),
    new ValidationFilter()
  );

  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties:true,
    exceptionFactory:(errors:ValidationError[])=>{
      const messages=errors.map(
        error=>`${error.property} has wrong value${error.value},
        ${Object.values(error.constraints).join(', ')}`
      )
      return new ValidationException(messages);
    }
  })
  );
  await app.listen(3000);
}
bootstrap();
