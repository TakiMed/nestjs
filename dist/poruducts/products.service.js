"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_models_1 = require("./product.models");
const common_1 = require("@nestjs/common");
let ProductsService = class ProductsService {
    constructor() {
        this.products = [];
    }
    insertProduct(title, desc, price, quantity) {
        const prodId = Math.random().toString();
        const newProduct = new product_models_1.Product(prodId, title, desc, price, quantity);
        this.products.push(newProduct);
        return prodId;
    }
    getProducts() {
        return [...this.products];
    }
    getSingleProduct(prodId) {
        const product = this.findProduct(prodId)[0];
        return Object.assign({}, product);
    }
    updateProduct(prodId, title, desc, price, quantity) {
        const [product, index] = this.findProduct(prodId);
        const updatedProduct = Object.assign({}, product);
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
        this.products[index] = updatedProduct;
    }
    findProduct(id) {
        const productIndex = this.products.findIndex((prod) => prod.id == id);
        const product = this.products.find((prod) => prod.id == id);
        if (!product) {
            throw new common_1.NotFoundException('No such product here');
        }
        return [product, productIndex];
    }
    deleteProduct(prodId) {
        const [product, index] = this.findProduct(prodId);
        this.products.splice(index, 1);
    }
};
ProductsService = __decorate([
    common_1.Injectable()
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map