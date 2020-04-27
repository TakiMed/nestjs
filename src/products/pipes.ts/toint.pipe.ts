import { ArgumentMetadata, BadRequestException,PipeTransform } from "@nestjs/common";

export class ToIntPipe implements PipeTransform{
    transform( value:string, metadata:ArgumentMetadata):number{
        const val=parseInt(value);
        if(isNaN(val)){
            throw new BadRequestException(
                `Conversion to number of ${value} failed`
            )
        }
        return val;
    }
}