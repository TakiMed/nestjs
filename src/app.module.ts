import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {ConfigModule} from '@nestjs/config'
import { ProductsModule } from './products/products.module';
import {ConfigService} from '@nestjs/config'
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
        }),
      ],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }), 
    ProductsModule, 
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
