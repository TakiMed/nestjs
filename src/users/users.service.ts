import { CreateUserDto } from './dto/create-user-dto';
import { Injectable } from '@nestjs/common';
import {User, UserRole} from './users.model';
import * as uuid from 'uuid/v1'
@Injectable()
export class UsersService {
    private users:User[]=[];
    getAllUsers(){
        return this.users;
    }
    createUser(createUserDto:CreateUserDto):User{
        const {username,password}=createUserDto
        const user:User={
            id:uuid(),
            username, //key-alue sam radi kas se isto zovu
            password,
            role:UserRole.USER,
        };
        this.users.push(user);
        return user;
    }
    getUserByUsername(username:string):User{
        return this.users.find(user=>user.username===username)
    }
    updateUserRole(username:string,role:UserRole):User{
        const user=this.getUserByUsername(username);
        user.role=role;
        return user
    }

}
