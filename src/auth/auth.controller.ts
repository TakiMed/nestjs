import { AuthService } from './auth.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';


@Controller('auth')
export class AuthController {
    constructor (
        private authService:AuthService,
    ){}

    @Post('/signup')
    signUp(@Body() createUserDto:CreateUserDto):Promise<void>{
        return this.authService.signUp(createUserDto);

    }
    
}
