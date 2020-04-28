import { CreateProductDto } from './dto/create-product.dto';
import { Controller, Get, Body, Post, Param, Patch, Delete } from '@nestjs/common';
import {ProductsService} from './products.service'
import { Product } from './product.models';
import {ApiTags,ApiBody} from '@nestjs/swagger';



@ApiTags('Products')
@Controller('products')               
export class ProductsController {
    constructor(
        private readonly productsService:ProductsService){}
    @Post()
    @ApiBody({type:CreateProductDto})
    async addProduct(
        @Body() product:CreateProductDto):Promise<Product>{
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
    @Body() changes:Product):Promise<Product>{
        const result = await this.productsService.updateProduct(prodId,changes)
        return result;
    }

    @Delete(':id')
    async removeProduct(@Param('id') prodId:string):Promise<void>{
        return await this.productsService.deleteProduct(prodId);   
    }

}