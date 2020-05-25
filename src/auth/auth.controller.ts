import { UsersService } from './../users/users.service';
import { sendEmail } from './../mailer';
import { AuthService } from './auth.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
  Req,
  Get,
  Delete,
} from '@nestjs/common';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.authService.signUp(createUserDto);
  }

  @Post('/signin')
  signIn(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(createUserDto);
  }

  @Get('/test')
  async test() {}
}
