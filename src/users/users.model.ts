export interface User {
    id:string;
    username:string;
    password:string;
    role:UserRole;
}

export enum UserRole{
    ADMIN='ADMIN',
    USER='USER',
}