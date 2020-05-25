import * as mongoose from 'mongoose';
import {
  IsString,
  Length,
  IsNumber,
  IsInt,
  Min,
  Max,
  IsMongoId,
} from 'class-validator';

export const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }, // JS type
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export class Product extends mongoose.Document {
  _id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  creator: {
    type: mongoose.Schema.Types.String;
    ref: 'User';
  };
}

module.exports = mongoose.model('Product', ProductSchema);

export class Salary {
  title: string;
  quantity: number;
  // time:datetime;
}
