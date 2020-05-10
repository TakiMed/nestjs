import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    addUser(user: CreateUserDto): Promise<any>;
    getAllUsers(): Promise<User[]>;
    findByUsername(username: string): Promise<User>;
    dropCollection(): Promise<void>;
}
