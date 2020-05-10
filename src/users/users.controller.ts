import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { UsersService } from './users.service';
import {Controller, Get, Param,Post,Body, Delete, UseGuards} from '@nestjs/common'
import { ApiAcceptedResponse, ApiCreatedResponse, ApiBody, ApiTags } from '@nestjs/swagger';
import { GetUserRole } from 'src/auth/get-user-role.decrator';


@ApiTags('Users')
@Controller("users")
@UseGuards(AuthGuard())
export class UsersController{
    constructor(private readonly userService:UsersService){}
    @Post()
    @ApiCreatedResponse({description:'User registration'})
    @ApiBody({type:CreateUserDto})
    async addUser(
        @Body() user:CreateUserDto):Promise<any>{
        return await this.userService.signUp(user);
    }
    @Get('/all')
    async getAllUsers( @GetUserRole() role): Promise<User[]> {
        return this.userService.getAllUsers(role);
    }

    @Get(':username')
    async findByUsername(@Param('username') username:string, @GetUserRole() role): Promise<User> {
        return this.userService.findByUsername(username, role);
    }

    @Delete()
    async dropCollection(@GetUserRole() role):Promise<void>{
        return this.userService.restoreUsers(role);
    }
}
