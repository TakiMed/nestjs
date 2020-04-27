import { User } from './users.model';
import { UsersService } from './users.service';
import {Controller, Get, Param} from '@nestjs/common'

@Controller("users")
export class UsersController{
    constructor(private readonly userService:UsersService){}
    
    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers()
    }

    @Get()
    async findByUsername(@Param('username') username:string): Promise<User> {
        return this.userService.findByUsername(username);
    }
}
