import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './poruducts/products.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ProductsModule, MongooseModule.forRoot('mongodb+srv://takiMed:<password>@cluster0-aif7q.mongodb.net/test?retryWrites=true&w=majority'
  ), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
