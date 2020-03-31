import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    addProduct(prodTitle: string, prodDesc: string, prodPrice: number, prodQuantity: number): Promise<{
        id: string;
    }>;
    getAllProducts(): Promise<import("./product.models").Product[]>;
    getProduct(prodId: string): Promise<any>;
    updateProduct(prodId: string, prodTitle: string, prodDesc: string, prodPrice: number, prodQuantity: number): Promise<void>;
    removeProduct(prodId: string): Promise<any>;
}
