import { UserSchema } from './../src/users/users.model';
import { UsersService } from '../src/users/users.service';
import { User } from '../src/users/users.model';
import { UserRole, Sector } from '../src/users/user.role.enum';
import * as bcrypt from 'bcryptjs';
import { InternalServerErrorException } from '@nestjs/common';
import { updateLocale } from 'moment';


const USERS = [
    {
        username: 'Manager2',
        password: 'Manager2.Manager2',
        role : UserRole.ADMIN,
        sector: Sector.MAN,
    },
    {
        username: 'Manager3',
        password: 'Manager3.Manager3',
        role : UserRole.ADMIN,
        sector: Sector.MAN,

    },
    {
        username: 'Meat1',
        password: 'Meat1.Meat1',
        role : UserRole.USER,
        sector: Sector.MEAT,

    },
    {
        username: 'Meat2',
        password: 'Meat2.Meat2',
        role : UserRole.USER,
        sector: Sector.MEAT,

    },
    {
        username: 'Sea1',
        password: 'Sea1.Sea1',
        role : UserRole.USER,
        sector: Sector.SEAFOOD,

    },
    {
        username: 'Sea2',
        password: 'Sea2.Sea2',
        role : UserRole.USER,
        sector: Sector.SEAFOOD,

    },
    {
        username: 'Dairy1',
        password: 'Dairy1.Dairy1',
        role : UserRole.USER,
        sector: Sector.DAIRY,

    },
    {
        username: 'Flowers1',
        password: 'Flowers1.Flowers1',
        role : UserRole.USER,
        sector: Sector.FAV,

    },
    {
        username: 'Decoration1',
        password: 'Decoration1.Decoration1',
        role : UserRole.USER,
        sector: Sector.FAV,
    }
]

async function signUp(user): Promise<any> {
    const username = user.username;
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);
    return user;
    // const newUser = await this.userModel.create(user);
    // await newUser.save();
  }

export const mig = async function ap(){
    USERS.forEach(user => signUp(user));
    return USERS;
}

async function up() {
    const res = mig()
    await this('User').insertMany(res);
}