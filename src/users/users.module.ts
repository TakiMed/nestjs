import { AuthModule } from './../auth/auth.module';
import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.model';

@Module({
  imports:[
    MongooseModule.forFeature([
    {name:'User',schema:UserSchema}]),
    forwardRef(() => AuthModule), 
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})

export class UsersModule {}
