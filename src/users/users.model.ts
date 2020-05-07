import { ApiProperty } from '@nestjs/swagger'
import { UserRole } from './user.role.enum';
import * as mongoose from 'mongoose';
import { IsMongoId, IsString, Length, IsIn } from 'class-validator';


export const UserSchema= new mongoose.Schema({
    username:{type :String, required:true},
    password:{type :String, required:true},
    role:{type:UserRole, required:true},
    passwordHash:{type:String},
});
export class User extends mongoose.Document{
    _id:string;

    username:string;
    
    password:string;

    role:UserRole;

    passwordHash:string;
}

module.exports=mongoose.model('User',UserSchema);
