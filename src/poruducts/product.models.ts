import * as mongoose from 'mongoose';

export const ProductSchema= new mongoose.Schema({
    title:{type :String, required:true},
    description:{type :String, required:true}, //JS type
    price:{type :Number, required:true},
    quantity:{type :Number, required:true}
});

export interface Product extends mongoose.Document{
  //interface ne koristi public
  id:string; //id ce biti _id autogenerisan iz baze
  title:string;
  description:string;
  price:number;
  quantity:number;
}


