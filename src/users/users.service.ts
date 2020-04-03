import { CreateUserDto } from './dto/create-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import {User, UserRole} from './users.model';
import * as uuid from 'uuid/v1'
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
@Injectable()
export class UsersService {
    private users:User[]=[];
    getAllUsers(){
        return this.users;
    }
    getUsersWithFilter(filterDto:GetUsersFilterDto):User[]{
        const {role,searchTerm}=filterDto;
        let users;
        if(role){
           users=this.getAllUsers().find(user => user.role===role);
        }
        if(searchTerm){
            users=this.getAllUsers().filter(user =>
                user.username.includes(searchTerm));
        }
        return users;
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
        const found=this.users.find(user=>user.username===username)
        if(!found){
           throw new NotFoundException(`No user with ${username} found`);
        }
        return found;
    }
    deleteUser(username:string):void{
        const found=this.getUserByUsername(username)
        this.users=this.users.filter(user=>user.username!==found.username);
    }
    updateUserRole(username:string,role:UserRole):User{
        const user=this.getUserByUsername(username);
        user.role=role;
        return user
    }

}
