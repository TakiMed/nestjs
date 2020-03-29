import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    addProduct(prodTitle: string, prodDesc: string, prodPrice: number, prodQuantity: number): {
        id: string;
    };
    getAllProducts(): import("./product.models").Product[];
    getProduct(prodId: string): {
        id: string;
        title: string;
        description: string;
        price: number;
        quantity: number;
    };
    updateProduct(prodId: string, prodTitle: string, prodDesc: string, prodPrice: number, prodQuantity: number): any;
    removeProduct(prodId: string): any;
}
