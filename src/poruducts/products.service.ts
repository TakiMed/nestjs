import {Product} from './product.models'
import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose'
import { TimeoutError } from 'rxjs';
@Injectable()
export class ProductsService{
    //odje ce lista proizvoda
    private products: Product[]=[];
    constructor(@InjectModel('Product') 
    private readonly productModel:Model<Product>
    ){}

    async insertProduct(title:string,desc:string,price:number,quantity:number):Promise<string>{
        const prodId= Math.random().toString();
        const newProduct= new this.productModel({
            title,
            description:desc,
            price,
            quantity
        });
        const result= await newProduct.save(); //cuva u bazu 
        return result.id as string;
    }

    async getProducts():Promise<Product[]>{
        const products = await this.productModel.find().exec();
        return products.map((prod)=>
        ({  id:prod.id,
            title:prod.title,
            description:prod.description,
            price:prod.price,
            quantity:prod.quantity})) as Product []; //dodajes kao nove ekemente, novi niz -pravis kopiju
    }

    async getSingleProduct(prodId:string):Promise<any>{
        const product=await this.findProduct(prodId);
        return {id:product.id,
        title:product.title,
        description:product.description,
        price:product.price,
        quantity:product.quantity}; //return as new obj
    }

    async updateProduct(prodId:string,title:string,desc:string,price:number,quantity:number):Promise<void>{
        const updatedProduct=await this.findProduct(prodId);
        if(title){updatedProduct.title=title}
        if(desc){updatedProduct.description=desc}
        if(price){updatedProduct.price=price}
        if(quantity){updatedProduct.quantity=quantity}
        updatedProduct.save();
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

    async deleteProduct(prodId:string):Promise<void>{
        const result=await this.productModel.deleteOne({_id:prodId}).exec();
        if(result.n===0){
            throw new NotFoundException('No such a product here');
        }
    }
}
