import { BadRequestException } from '@nestjs/common';
import { Controller, Get, Body, Post, Param, Patch, Delete } from '@nestjs/common';
import {ProductsService} from './products.service'
import { Product } from './product.models';

@Controller('products')                 //singlton je injectable-design patern
export class ProductsController {
    constructor(
        private readonly productsService:ProductsService){}
    @Post()
    async addProduct(
        @Body() product:Product):Promise<Product>{
        return await this.productsService.insertProduct(product);
    }
    @Get()
    async getAllProducts():Promise<Product[]>{
        const products= await this.productsService.getProducts();
        return products;
    }
    @Get(':id')
    async getProduct(@Param('id') prodId:string){
        const product=await this.productsService.getSingleProduct(prodId);
        return product
    }

    @Get(':username')
    async getProductsByUser(@Param('username') username:string){
        if(!username){
            throw new BadRequestException("User must be defined")
        }
        
    }

    @Patch(':id')
    async updateProduct(@Param('id') prodId:string,
    @Body() changes:Product):Promise<Product>{
        const result = await this.productsService.updateProduct(prodId,changes)
        return result;
    }

    @Delete(':id')
    async removeProduct(@Param('id') prodId:string):Promise<void>{
        return await this.productsService.deleteProduct(prodId);
        
    }

}