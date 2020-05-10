import { UserRole } from './../users/user.role.enum';
import { User } from './../users/users.model';
import { CreateProductDto } from './dto/create-product.dto';
import {Product} from './product.models'
import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose'
import { GetUserId } from 'src/auth/get-user.decorator';
import { GetUserRole } from 'src/auth/get-user-role.decrator';

@Injectable()
export class ProductsService{
    private products: Product[]=[];
    constructor(
    @InjectModel('Product') private readonly productModel:Model<Product>,
    @InjectModel('User') private readonly userModel:Model<User>,
    ){}

    async insertProduct(product:CreateProductDto, @GetUserId() userId):Promise<Product>{
        const newProd = await this.productModel.create(product);
        console.log(userId);
        newProd.creator = userId;
        await newProd.save();
        return newProd;
    }

    async getProducts(@GetUserId() userId, @GetUserRole() role):Promise<Product[]>{
        if (role==UserRole.USER) { return await this.productModel.find({creator:userId},{__v:0}).exec();}
        else return this.productModel.find();
    }

    async getSingleProduct(prodId:string, @GetUserId() userId, @GetUserRole() role):Promise<any>{
        try{
            if (role === UserRole.USER) {
                return await this.productModel.find({ _id: prodId, creator: userId });}
            else {
                return await this.productModel.findOne({ _id: prodId })}
            }
        catch(error){
            throw new NotFoundException('No such product here');
        };
    }

    async updateProduct(prodId:string, changes:Product, @GetUserId() userId, @GetUserRole() role): Promise<Product>{
        let updatedProduct;
        if(role===UserRole.USER){
            updatedProduct = await this.productModel.findOneAndUpdate({_id:prodId, creator: userId},changes);}
        else{
            updatedProduct = await this.productModel.findOneAndUpdate({_id:prodId}, changes);
        }
            updatedProduct.save();
        return updatedProduct;
    }

    async deleteProduct(prodId:string, @GetUserRole() role):Promise<void>{
        if(role===UserRole.ADMIN){
            try{
                await this.productModel.deleteOne({_id:prodId}).exec();
            }
            catch (error){
                throw new NotFoundException('No such a product here');
            }
        }
        else {throw new UnauthorizedException('Restricted rights')}
    }
}
