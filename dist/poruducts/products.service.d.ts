import { Product } from './product.models';
import { Model } from 'mongoose';
export declare class ProductsService {
    private readonly productModel;
    private products;
    constructor(productModel: Model<Product>);
    insertProduct(title: string, desc: string, price: number, quantity: number): Promise<string>;
    getProducts(): Promise<Product[]>;
    getSingleProduct(prodId: string): Promise<any>;
    updateProduct(prodId: string, title: string, desc: string, price: number, quantity: number): Promise<void>;
    private findProduct;
    deleteProduct(prodId: string): Promise<void>;
}
