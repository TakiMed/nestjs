import { Product } from './product.models';
import { Model } from 'mongoose';
export declare class ProductsService {
    private readonly productModel;
    private products;
    constructor(productModel: Model<Product>);
    insertProduct(product: Partial<Product>): Promise<Product>;
    getProducts(): Promise<Product[]>;
    getSingleProduct(prodId: string): Promise<any>;
    updateProduct(prodId: string, changes: Partial<Product>): Promise<Product>;
    deleteProduct(prodId: string): Promise<void>;
    private findProduct;
}
