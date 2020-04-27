import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MONGO_URL } from './constants';
import { ProductsModule } from './poruducts/products.module';

@Module({
  imports: [MongooseModule.forRoot(MONGO_URL), ProductsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
