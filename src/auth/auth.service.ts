import { CreateUserDto } from './../users/dto/create-user.dto';
import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        private usersService:UsersService
    ){}

    async signUp(createUserDto:CreateUserDto){
        return this.usersService.signUp(createUserDto);
    }
}
