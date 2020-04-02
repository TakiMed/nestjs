import { CreateUserDto } from './dto/create-user-dto';
import { User, UserRole } from './users.model';
import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { UsersService} from './users.service'

@Controller('users')
export class UsersController {
    constructor(private usersService:UsersService){}
    //sad sve iz usersservica mozes preko this.usersservice da pristupis
    @Get()
    getAllUsers():User[]{
        return this.usersService.getAllUsers();
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
