import { AuthService } from './auth.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { Controller, Post, Body, UnauthorizedException, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUserId } from './get-user.decorator';


@Controller('auth')
export class AuthController {
    constructor (
        private authService:AuthService,
    ){}

    @Post('/signup')
    signUp(@Body() createUserDto:CreateUserDto):Promise<void>{
        return this.authService.signUp(createUserDto);
    }

    @Post('/signin')
    signIn(@Body() createUserDto:CreateUserDto): Promise<{ accessToken: string }>{
        return this.authService.signIn(createUserDto);
    }
    
    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUserId() user:any){
        console.log(user);
    }
}
