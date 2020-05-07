import { UsersService } from './../users/users.service';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/users.model';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:'User',schema:UserSchema}]),
      UsersService],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
