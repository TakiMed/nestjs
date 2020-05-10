import { UserRole } from './user.role.enum';
import * as bcrypt from 'bcryptjs'
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { Model } from 'mongoose';
import { Injectable, BadRequestException, InternalServerErrorException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GetUserRole } from 'src/auth/get-user-role.decrator';

@Injectable()
export class UsersService {

    constructor (@InjectModel("User")
    
    private userModel:Model<User>
    ){}


    async getAllUsers(@GetUserRole() role):Promise<User[]>{
        if (role===UserRole.ADMIN){return this.userModel.find({},{__v:0})}
        else {throw new BadRequestException();}
    }
    
    async signUp(user:CreateUserDto):Promise<any>{
        const username = user.username;
        const existing = await this.userModel.findOne({username})
        if(existing){
            throw new ConflictException('Username already exists');
        }
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(user.password, user.salt);
        const newUser = await this.userModel.create(user);
        await newUser.save();
    }

    private async hashPassword(password:string, salt:string):Promise<string>{
        return await bcrypt.hash(password, salt);
    }

    async findByUsername(username:string, @GetUserRole() role):Promise<User>{
        if (role===UserRole.ADMIN){
            return await this.userModel.findOne({username});
        }
        else throw new UnauthorizedException;
    }

    async validateUserPassword(createUserDto:CreateUserDto):Promise<string>{
        const user = await this.userModel.findOne({username:createUserDto.username}); //iz baze
        const passBool = await bcrypt.compare (createUserDto.password, user.password);
        if(user && passBool) {
            return user.username;
        }
        else {throw new BadRequestException('Invalid signin credentials');}
    }

    async restoreUsers( @GetUserRole() role ):Promise<void>{
        if (role === UserRole.ADMIN) {await this.userModel.deleteMany({}, function (err){
            if(err){throw new InternalServerErrorException}
        })}
        else throw new UnauthorizedException;
    }

}
