import { User } from './../users/users.model';
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUserId = createParamDecorator(async (data, ctx:ExecutionContext): Promise<any> =>{
    const req=ctx.switchToHttp().getRequest();
    return await req.user._id;
})