import {Product} from './product.models'
import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose'
import { TimeoutError } from 'rxjs';
@Injectable()
export class ProductsService{
    private products: Product[]=[];
    constructor(@InjectModel('Product') 
    private readonly productModel:Model<Product>
    ){}

    async insertProduct(product:Partial<Product>):Promise<Product>{
        const newProd=await this.productModel.create(product);
        await newProd.save();
        return newProd.toObject();
    }

    async getProducts():Promise<Product[]>{
        const products = await this.productModel.find({_v:0}).exec();
        return products
    }

    async getSingleProduct(prodId:string):Promise<any>{
        const product=await this.findProduct(prodId);
        return {id:product.id,
        title:product.title,
        description:product.description,
        price:product.price,
        quantity:product.quantity}; //return as new obj
    }

    async updateProduct(prodId:string,changes:Partial<Product>):Promise<Product>{
        const updatedProduct=await this.productModel.findOneAndUpdate({_id:prodId},changes);
        updatedProduct.save();
        return updatedProduct;
    }

    async deleteProduct(prodId:string):Promise<void>{
        const result=await this.productModel.deleteOne({_id:prodId}).exec();
        if(result.n===0){
            throw new NotFoundException('No such a product here');
        }
    }
    private async findProduct(id:string):Promise<Product>{
        let product;
        try{
            product=await this.productModel.findById(id);
        }
        catch(error){
            throw new NotFoundException('No such product here');
        };
        return product;
    }
}
