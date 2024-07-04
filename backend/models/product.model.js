import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    sizes: {
        type: String,
        required: true,
        default: [],
    },
});

const Product = mongoose.model('Product' , productSchema);

export default Product;