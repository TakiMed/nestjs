import { ApiProperty } from '@nestjs/swagger'
import { UserRole } from './user.role.enum';
import * as mongoose from 'mongoose';
import { IsMongoId, IsString, Length, IsIn } from 'class-validator';


export const UserSchema= new mongoose.Schema({
    username:{type :String, required:true},
    password:{type :String, required:true},
    role:{type:UserRole, required:true},
});
export class User extends mongoose.Document{
    @IsMongoId()
    _id:string;
    
    @IsString()
    @Length(5,15)
    @ApiProperty({type:String, description:'username'})
    username:string;
    

    @IsString()
    @ApiProperty({type:String, description:'password'})
    password:string;
    
    @IsIn([UserRole.ADMIN,UserRole.USER])
    
    role:UserRole;
}

module.exports=mongoose.model('User',UserSchema);
