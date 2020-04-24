import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Module({
  imports:[TypeOrmModule.forFeature([UserRepository]), 
  //MongooseModule.forFeature([{name:'User',schema:UserSchema}])
  ],
  controllers: [UsersController],
  providers: [UsersService]
})

export class UsersModule {}
