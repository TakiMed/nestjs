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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const class_validator_1 = require("class-validator");
exports.ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
class Product extends mongoose.Document {
}
__decorate([
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], Product.prototype, "_id", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(3, 100),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(20),
    __metadata("design:type", Number)
], Product.prototype, "quantity", void 0);
exports.Product = Product;
module.exports = mongoose.model('Product', exports.ProductSchema);
//# sourceMappingURL=product.models.js.map