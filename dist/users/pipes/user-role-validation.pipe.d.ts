import { PipeTransform } from "@nestjs/common";
export declare class UserRoleValidationPipe implements PipeTransform {
    readonly allowRoles: any[];
    transform(value: any): any;
    private isUserRoleValid;
}
