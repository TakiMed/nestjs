import { UserRole } from './user.role.enum';
import * as mongoose from 'mongoose';

export interface User {
    id:string;
    username:string;
    password:string;
    role:UserRole;
}

export const UserSchema= new mongoose.Schema({
    id:String,
    username:{type :String, required:true},
    password:{type :String, required:true},
    role:{type:UserRole, required:true},
    createdProducts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }]
});
module.exports=mongoose.model('User',UserSchema);
