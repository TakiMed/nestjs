import * as mongoose from 'mongoose';
import { IsString, Length, IsNumber, IsInt, Min, Max, IsMongoId } from 'class-validator';

export const ProductSchema= new mongoose.Schema({
    title:{type :String, required:true},
    description:{type :String, required:true}, //JS type
    price:{type :Number, required:true},
    quantity:{type :Number, required:true},
    creator:{type:mongoose.Schema.Types.ObjectId, ref:'User'}
});

export class Product extends mongoose.Document{
  @IsMongoId() 
  _id:string;
  
  @IsString()
  title:string;

  @IsString()
  @Length(3,100)
  description:string;

  @IsNumber()
  price:number;

  @IsInt()
  @Min(0)
  @Max(20)
  quantity:number;
  
  creator:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
}

module.exports=mongoose.model('Product',ProductSchema);


