import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { Model } from 'mongoose';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    getAllUsers(): Promise<User[]>;
    signUp(user: CreateUserDto): Promise<any>;
    private hashPassword;
    findByUsername(username: string): Promise<User>;
    validateUserPassword(createUserDto: CreateUserDto): Promise<string>;
    restoreUsers(): Promise<void>;
}
