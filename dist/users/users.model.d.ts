export interface User {
    id: string;
    username: string;
    password: string;
    role: UserRole;
}
export declare enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER"
}
