"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_model_1 = require("./../users.model");
const common_1 = require("@nestjs/common");
class UserRoleValidationPipe {
    constructor() {
        this.allowRoles = [
            users_model_1.UserRole.ADMIN,
            users_model_1.UserRole.USER
        ];
    }
    transform(value) {
        value = value.toUpperCase();
        if (!this.isUserRoleValid(value)) {
            throw new common_1.BadRequestException(`Try with admin or user`);
        }
        return value;
    }
    isUserRoleValid(role) {
        const ind = this.allowRoles.indexOf(role);
        return ind !== -1;
    }
}
exports.UserRoleValidationPipe = UserRoleValidationPipe;
//# sourceMappingURL=user-role-validation.pipe.js.map