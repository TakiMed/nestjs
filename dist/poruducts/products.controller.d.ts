import { ProductsService } from './products.service';
import { Product } from './product.models';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    addProduct(product: Product): Promise<Product>;
    getAllProducts(): Promise<Product[]>;
    getProduct(prodId: string): Promise<any>;
    updateProduct(prodId: string, changes: Product): Promise<Product>;
    removeProduct(prodId: string): Promise<void>;
}
