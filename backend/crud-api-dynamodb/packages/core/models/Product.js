// Define the product schema
import * as mongoose from "mongoose";
import { Schema } from "mongoose";
const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    active: { type: Boolean, default: true },
});
// Create a Mongoose model based on the schema
export const ProductModel = mongoose.model('Product', productSchema);
