import { CreateUserDto } from './dto/create-user.dto';

import { User } from './users.model';
import { UsersService } from './users.service';
import {Controller, Get, Param,Post,Body} from '@nestjs/common'
import { ApiAcceptedResponse, ApiCreatedResponse, ApiBody, ApiTags } from '@nestjs/swagger';
@ApiTags('Users')
@Controller("users")
export class UsersController{
    constructor(private readonly userService:UsersService){}
    ////////poraditi na error hendlingu za users!!!!!!!!!!!!!!!!!!!
    @Post()
    @ApiCreatedResponse({description:'User registration'})
    @ApiBody({type:CreateUserDto})
    async addUser(
        @Body() user:CreateUserDto):Promise<User>{
        return await this.userService.insertUser(user);
    }
    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers()
    }

    @Get()
    async findByUsername(@Param('username') username:string): Promise<User> {
        return this.userService.findByUsername(username);
    }
}
