import { CreateUserDto } from './dto/create-user.dto';
import { User, UserRole } from './users.model';
import { Controller, Get, Post, Body, Param, Patch, Query } from '@nestjs/common';
import { UsersService} from './users.service'
import { GetUsersFilterDto } from './dto/get-users-filter.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService:UsersService){}
    //sad sve iz usersservica mozes preko this.usersservice da pristupis
    @Get()
    getAllUsers(@Query() filterDto:GetUsersFilterDto):User[]{
        if(Object.keys(filterDto).length){
            return this.usersService.getUsersWithFilter(filterDto);
        }
        else{
            return this.usersService.getAllUsers();
    }
    }

    @Get('/:username')
    getUserByUsername(@Param('username') username:string){
        return this.usersService.getUserByUsername(username);
    }

    @Post()
    createUser(
       @Body() createUserDto:CreateUserDto
        ):User{
        return this.usersService.createUser(createUserDto);
    }
    @Patch('/:username/role')
    updateUserRole(
        @Param('username') username:string,
        @Body('role') role:UserRole){
        return this.usersService.updateUserRole(username,role);
    }
}
