import { User } from './user.entity';
import { UserRoleValidationPipe } from './pipes/user-role-validation.pipe';
import { CreateUserDto } from './filters/create-user.dto'
import { Controller, Get, Post, Body, Param, Patch, Query, UsePipes, ValidationPipe, Delete } from '@nestjs/common';
import { UsersService} from './users.service'
import { GetUsersFilterDto } from './filters/get-users-filter.dto'

@Controller('users')
export class UsersController {
    constructor(private usersService:UsersService){}
    //sad sve iz usersservica mozes preko this.usersservice da pristupis    @Get()
    getUsers(@Query(ValidationPipe) filterDto:GetUsersFilterDto):User[]{
        if(Object.keys(filterDto).length){
            return this.usersService.getUsersWithFilter(filterDto);
        }
        else{
            return this.usersService.getAllUsers();
    }
    }

    @Get('/:username')
    getUserByUsername(@Param('username') username:string):Promise<User>{
        return this.usersService.getUserByUsername(username);
    }
/*
    @Post()
    @UsePipes(ValidationPipe) //validirace podatke na osnovu dto-a
    createUser(
       @Body() createUserDto:CreateUserDto
        ):User{
        return this.usersService.createUser(createUserDto);
    }
    @Patch('/:username/role')
    updateUserRole(
        @Param('username') username:string,
        @Body('role',UserRoleValidationPipe) role:UserRole){
        return this.usersService.updateUserRole(username,role);
    }
    @Delete('/:username')
    deleteUser(@Param('username') username:string):void{
        return this.usersService.deleteUser(username)
    }*/
}
