import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './poruducts/products.module';
import { UsersModule } from './users/users.module';
import { MONGO_URL } from './constants';

@Module({
  imports: [MongooseModule.forRoot(MONGO_URL), ProductsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
