import { UserRole } from './user.role.enum';
import * as mongoose from 'mongoose';
import { IsMongoId, IsString, Length, IsIn } from 'class-validator';

export class User extends mongoose.Document {
    @IsMongoId()
    _id:string;
    
    @IsString()
    @Length(5,15)
    username:string;
    
    password:string;
    
    @IsIn([UserRole.ADMIN,UserRole.USER])
    role:UserRole;
}

export const UserSchema= new mongoose.Schema({
    username:{type :String, required:true},
    password:{type :String, required:true},
    role:{type:UserRole, required:true},
});
module.exports=mongoose.model('User',UserSchema);
