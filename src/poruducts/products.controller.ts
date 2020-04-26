import { HttpExceptionFilter } from './filters/http.filter';
import { InjectModel } from '@nestjs/mongoose';
import { Controller, Get, Body, Post, Param, Patch, Delete, UseFilters } from '@nestjs/common';
import {ProductsService} from './products.service'
import { Product } from './product.models';
@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService:ProductsService){}
    @Post()
    async addProduct(@Body() product:Partial<Product>):Promise<Product>{
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

    @Patch(':id')
    async updateProduct(@Param('id') prodId:string,
    @Body() changes:Partial<Product>):Promise<Product>{
        const result = await this.productsService.updateProduct(prodId,changes)
        return result;
    }

    @Delete(':id')
    async removeProduct(@Param('id') prodId:string):Promise<void>{
        await this.productsService.deleteProduct(prodId);
        return null;
    }

}