import { Controller, Get, Body, Post, Param, Patch, Delete } from '@nestjs/common';
import {ProductsService} from './products.service'
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService:ProductsService){}
    @Post()
    async addProduct(@Body('title') prodTitle:string,
    @Body('description') prodDesc:string,
    @Body('price') prodPrice:number,
    @Body('quantity') prodQuantity:number,
    ){
        const generatedId=await this.productsService.insertProduct(
            prodTitle,
            prodDesc,
            prodPrice,
            prodQuantity);
        return {id:generatedId};
    }
    @Get()
    async getAllProducts(){
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
    @Body('title') prodTitle:string,
    @Body('description') prodDesc:string,
    @Body('price') prodPrice:number,
    @Body('quantity') prodQuantity:number,){
        const result = await this.productsService.updateProduct(prodId,prodTitle,prodDesc,prodPrice,prodQuantity)
        return result;
    }

    @Delete(':id')
    async removeProduct(@Param('id') prodId:string){
        await this.productsService.deleteProduct(prodId);
        return null;
    }

}