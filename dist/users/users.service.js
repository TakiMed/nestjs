"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcryptjs");
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getAllUsers() {
        return this.userModel.find({}, { __v: 0 });
    }
    async signUp(user) {
        const username = user.username;
        const existing = await this.findByUsername(username);
        if (existing) {
            throw new common_1.ConflictException('Username already exists');
        }
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(user.password, user.salt);
        const newUser = await this.userModel.create(user);
        await newUser.save();
    }
    async hashPassword(password, salt) {
        return bcrypt.hash(password, salt);
    }
    async findByUsername(username) {
        return this.userModel.findOne({ username });
    }
    async validateUserPassword(createUserDto) {
        const user = await this.findByUsername(createUserDto.username);
        const passBool = bcrypt.compare(createUserDto.password, user.password);
        console.log(createUserDto.password, user.password);
        console.log(passBool);
        if (user && passBool) {
            return user.username;
        }
        else {
            return null;
        }
    }
    async restoreUsers() {
        await this.userModel.deleteMany({}, function (err) {
            if (err) {
                throw new common_1.InternalServerErrorException;
            }
        });
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel("User")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map