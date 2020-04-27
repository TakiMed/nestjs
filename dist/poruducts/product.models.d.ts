import * as mongoose from 'mongoose';
export declare const ProductSchema: mongoose.Schema<any>;
export declare class Product extends mongoose.Document {
    _id: string;
    title: string;
    description: string;
    price: number;
    quantity: number;
}
