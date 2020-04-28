import { UserRole } from '../user.role.enum';
import {IsString,Length, IsIn} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsString()
    @Length(5,15)
    @ApiProperty({type:String, description:'username'})
    username:string;
    

    @IsString()
    @ApiProperty({type:String, description:'password'})
    password:string;

    @IsIn(["ADMIN","USER"])
    @ApiProperty({enum: UserRole,description:'USER/ADMIN'})
    role:UserRole;
}