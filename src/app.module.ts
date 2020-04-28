import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MONGO_URL } from './constants';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [MongooseModule.forRoot("mongodb://takiMed:TakiMeda1995.@cluster0-shard-00-00-aif7q.mongodb.net:27017,cluster0-shard-00-01-aif7q.mongodb.net:27017,cluster0-shard-00-02-aif7q.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority", {useNewUrlParser:true}), ProductsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
