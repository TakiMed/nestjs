import { UserRepository } from './user.repository';
import { User } from './user.entity';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: UserRepository);
    getUserByUsername(username: string): Promise<User>;
}
