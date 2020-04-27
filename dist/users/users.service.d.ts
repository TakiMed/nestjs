import { User } from './users.model';
import { Model } from 'mongoose';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    getAllUsers(): Promise<User[]>;
    findByUsername(username: string): Promise<User>;
}
