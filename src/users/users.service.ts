import { User } from './users.model';
import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {

    constructor (@InjectModel("User")
    
    private userModel:Model<User>
    ){}

    async getAllUsers():Promise<User[]>{
        return this.userModel.find()
    }
    async findByUsername(username:string):Promise<User>{
        return this.userModel.findOne({
            username:username})
    }

}
