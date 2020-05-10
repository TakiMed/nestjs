import { UserRole } from './../users/user.role.enum';
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUserRole = createParamDecorator(async (data, ctx:ExecutionContext): Promise<UserRole> =>{
    const req=ctx.switchToHttp().getRequest();
    return await req.user.role;
})