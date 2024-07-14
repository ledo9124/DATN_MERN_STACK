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
        default: "",
    },
    sizes: {
        type: Array,
        default: [],
    },
    cateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
