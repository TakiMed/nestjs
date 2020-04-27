import { UserRole } from './user.role.enum';
import * as mongoose from 'mongoose';
export declare class User extends mongoose.Document {
    _id: string;
    username: string;
    password: string;
    role: UserRole;
}
export declare const UserSchema: mongoose.Schema<any>;
