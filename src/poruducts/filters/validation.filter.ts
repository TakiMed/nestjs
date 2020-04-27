import { ExceptionFilter, ArgumentsHost, Catch, BadRequestException } from "@nestjs/common";

@Catch(BadRequestException)
export class ValidationFilter implements ExceptionFilter{
    catch(exception: BadRequestException, host:ArgumentsHost){
        const ctx=host.switchToHttp();
        const res=ctx.getResponse();
        return res.status(400).json({
            statusCode:400,
            createdBy:"ValidationFilter",
            validationErrors: exception.message
        });

    }
}