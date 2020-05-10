import { CreateUserDto } from './../users/dto/create-user.dto';
import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload-interface';

@Injectable()
export class AuthService {
    constructor(
        private usersService:UsersService,
        private jwtService:JwtService,
    ){}

    async signUp (createUserDto:CreateUserDto){
        return this.usersService.signUp (createUserDto);
    }

    async signIn (createUserDto:CreateUserDto): Promise<{ accessToken:string }>{
        const username = await this.usersService.validateUserPassword (createUserDto);
        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);
        console.log(accessToken);

        return { accessToken };
    }
}
