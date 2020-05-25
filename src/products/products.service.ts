import { FindProductDto } from './dto/find-prod-dto';
import { SellOrBuyDTO } from './dto/sell-and-buy-dto';
import { sendEmail } from './../mailer';
import { UserRole } from './../users/user.role.enum';
import { Cron } from '@nestjs/schedule';
import { User } from './../users/users.model';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.models';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetUser } from 'src/auth/get-user.decorator';
import { GetUserRole } from 'src/auth/get-user-role.decrator';
import * as fs from 'fs';
import * as json2csv from 'json2csv';
import * as moment from 'moment';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async insertProduct(
    product: CreateProductDto,
    @GetUser() user,
  ): Promise<Product> {
    const existing = await this.productModel.findOne({ title: product.title });
    if (existing) {
      throw new BadRequestException('Product already exists');
    } else {
      const newProd = await this.productModel.create(product);
      newProd.creator = user._id;
      await newProd.save();
      this.dataToCSV(newProd);
      return newProd;
    }
  }

  async getProducts(@GetUser() user): Promise<Product[]> {
    const userId = user._id;
    const role = user.role;
    const data =
      role === UserRole.USER
        ? await this.productModel.find({ creator: userId }, { __v: 0 }).exec()
        : await this.productModel.find({}, { __v: 0 }).exec();

    await this.dataToCSV(data);
    return data;
  }

  async getProductsWithFilter(
    @GetUser() user,
    filterDto: FindProductDto,
  ): Promise<Product[]> {
    const { search, quantity } = filterDto;
    const products = await this.getProducts(user);
    let filtered;
    if (search) {
      filtered = await products.filter(
        prod =>
          prod.title.includes(search) || prod.description.includes(search),
      );
    }
    if (quantity) {
      filtered = await products.filter(prod => prod.quantity > quantity);
    }
    return filtered;
  }

  async getSingleProduct(prodId: string, @GetUser() user): Promise<any> {
    const userId = user._id;
    const role = user.role;
    try {
      if (role === UserRole.USER) {
        return await this.productModel.find({ _id: prodId, creator: userId });
      } else {
        return await this.productModel.findOne({ _id: prodId });
      }
    } catch (error) {
      throw new NotFoundException('No such product here');
    }
  }

  async updateProduct(
    prodId: string,
    changes: Product,
    @GetUser() user,
  ): Promise<Product> {
    const userId = user._id;
    const role = user.role;
    const updatedProduct =
      role === UserRole.USER
        ? await this.productModel.findOneAndUpdate(
            { _id: prodId, creator: userId },
            changes,
            { new: true },
          )
        : await this.productModel.findByIdAndUpdate(prodId, changes, {
            new: true,
          });
    return updatedProduct;
  }

  async deleteProduct(prodId: string, @GetUserRole() role): Promise<string> {
    if (role === UserRole.ADMIN) {
      try {
        await this.productModel.deleteOne({ _id: prodId }).exec();
        return `Product with id ${prodId} deleted`;
      } catch (error) {
        throw new NotFoundException('No such a product here');
      }
    } else {
      throw new UnauthorizedException('Restricted rights');
    }
  }

  async sell(prodId: string, quant: number): Promise<Product> {
    const prod = await this.productModel.findOne({ _id: prodId });
    const newQuan = prod.quantity - quant;
    if (newQuan >= 0) {
      await prod.update({ quantity: newQuan });
      prod.save();
      return prod;
    } else {
      throw new BadRequestException('You exceeded quantity in stock');
    }
  }

  async buy(prodId: string, quant: number): Promise<Product> {
    const prod = await this.productModel.findOne({ _id: prodId });
    const newQuan = prod.quantity + quant;
    await prod.update({ quantity: newQuan });
    prod.save();
    return prod;
  }

  async dataToCSV(data) {
    const fields = [
      '_id',
      'title',
      'description',
      'price',
      'quantity',
      'creator',
    ];
    const csvParser = new json2csv.Parser({ fields });
    const csv = await csvParser.parse(data);
    fs.writeFile('file.csv', csv, err => {
      if (err)
        throw new InternalServerErrorException('Failed converting to csv');
    });
  }

  async sayHi() {
    console.log('HI');
  }
  async myStock(): Promise<any> {
    const res = await this.productModel
      .aggregate([
        {
          $group: {
            _id: '$title',
            totalAmount: { $sum: { $multiply: ['$price', '$quantity'] } },
          },
        },
      ])
      .exec();
    console.log(res);
    return res;
  }

  @Cron('0 41 17 * * *')
  handleCron() {
    sendEmail();
    console.log('mail sent');
  }
}
