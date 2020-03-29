import { Product } from './product.models';
export declare class ProductsService {
    private products;
    insertProduct(title: string, desc: string, price: number, quantity: number): string;
    getProducts(): Product[];
    getSingleProduct(prodId: string): {
        id: string;
        title: string;
        description: string;
        price: number;
        quantity: number;
    };
    updateProduct(prodId: string, title: string, desc: string, price: number, quantity: number): void;
    private findProduct;
    deleteProduct(prodId: string): void;
}
