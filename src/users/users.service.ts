import { CreateUserDto } from './filters/create-user.dto;
import { Injectable, NotFoundException } from '@nestjs/common';

import {User} from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UsersService {
    constructor (
        @InjectRepository(UserRepository)
        private userRepository:UserRepository,
    ){}
   /* getAllUsers(){
        return this.users;
    }*/
    async getUserByUsername(username:string):Promise<User>{
        const found= await this.userRepository.findOne(username);
        if(!found){
           throw new NotFoundException(`No user with ${username} found`);
        }
        return found;
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
