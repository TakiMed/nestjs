import { UserRole } from './user.role.enum';
import * as mongoose from 'mongoose';


export const UserSchema= new mongoose.Schema({
    username:{type :String, required:true,unique:true},
    password:{type :String, required:true},
    role:{type:UserRole, required:true},
    salt:{type:String},
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
      }]
});
export class User extends mongoose.Document{
    _id:string;

    username:string;
    
    password:string;

    role:UserRole;

    salt:string;

}


module.exports=mongoose.model('User',UserSchema);
