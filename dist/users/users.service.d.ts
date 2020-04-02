import { User } from './users.model';
export declare class UsersService {
    private users;
    getAllUsers(): User[];
    createUser(username: string, password: string): User;
}
