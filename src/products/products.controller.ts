import { UserRole } from './../users/user.role.enum';
import { User } from './../users/users.model';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { CreateProductDto } from './dto/create-product.dto';
import { Controller, Get, Body, Post, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service'
import { Product } from './product.models';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { GetUserId } from 'src/auth/get-user.decorator';
import { GetUserRole } from 'src/auth/get-user-role.decrator';



//@ApiTags('Products')
@Controller('products')
@UseGuards(AuthGuard())
//@ApiBearerAuth('jwt')
export class ProductsController {
    constructor(
        private readonly productsService:ProductsService){}
    @Post()
    //@ApiBody({type:CreateProductDto})
    async addProduct(
        @Body() product:CreateProductDto, @GetUserId() user): Promise<Product>{
        return await this.productsService.insertProduct(product, user);
    }
    @Get()
    async getAllProducts(@GetUserId() userId, @GetUserRole() role):Promise<Product[]>{
        const products= await this.productsService.getProducts(userId, role);
        return products;
    }
    @Get(':id')
    async getProduct(@Param('id') prodId:string, @GetUserId() userId, @GetUserRole() role){
        const product=await this.productsService.getSingleProduct(prodId, userId, role);
        return product;
    }

    @Patch(':id')
    async updateProduct(@Param('id') prodId:string,
        @Body() changes:Product,
        @GetUserId() userId,
        @GetUserRole() role): Promise<Product>{
            const result = await this.productsService.updateProduct(prodId, changes, userId, role);
            return result;
    }

    @Delete(':id')
    async removeProduct(@Param('id') prodId:string, @GetUserRole() role):Promise<void>{
        return await this.productsService.deleteProduct(prodId, role);   
    }

}