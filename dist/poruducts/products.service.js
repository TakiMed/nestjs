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
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProductsService = class ProductsService {
    constructor(productModel) {
        this.productModel = productModel;
        this.products = [];
    }
    async insertProduct(title, desc, price, quantity) {
        const prodId = Math.random().toString();
        const newProduct = new this.productModel({
            title,
            description: desc,
            price,
            quantity
        });
        const result = await newProduct.save();
        return result.id;
    }
    async getProducts() {
        const products = await this.productModel.find().exec();
        return products.map((prod) => ({ id: prod.id,
            title: prod.title,
            description: prod.description,
            price: prod.price,
            quantity: prod.quantity }));
    }
    async getSingleProduct(prodId) {
        const product = await this.findProduct(prodId);
        return { id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
            quantity: product.quantity };
    }
    async updateProduct(prodId, title, desc, price, quantity) {
        const updatedProduct = await this.findProduct(prodId);
        if (title) {
            updatedProduct.title = title;
        }
        if (desc) {
            updatedProduct.description = desc;
        }
        if (price) {
            updatedProduct.price = price;
        }
        if (quantity) {
            updatedProduct.quantity = quantity;
        }
        updatedProduct.save();
    }
    async findProduct(id) {
        let product;
        try {
            product = await this.productModel.findById(id);
        }
        catch (error) {
            throw new common_1.NotFoundException('No such product here');
        }
        ;
        return product;
    }
    async deleteProduct(prodId) {
        const result = await this.productModel.deleteOne({ _id: prodId }).exec();
        if (result.n === 0) {
            throw new common_1.NotFoundException('No such a product here');
        }
    }
};
ProductsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Product')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map