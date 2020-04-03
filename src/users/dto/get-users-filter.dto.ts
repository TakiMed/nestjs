import { UserRole } from './../users.model';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
export class GetUsersFilterDto{
    @IsOptional()
    @IsIn([UserRole.ADMIN,UserRole.USER])
    role:UserRole;
    @IsOptional()
    @IsNotEmpty()
    searchTerm:string;
}
