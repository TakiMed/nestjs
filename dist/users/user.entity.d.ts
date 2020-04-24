import { UserRole } from './user.role.enum';
import { BaseEntity } from "typeorm";
export declare class User extends BaseEntity {
    id: string;
    username: string;
    password: string;
    role: UserRole;
}
