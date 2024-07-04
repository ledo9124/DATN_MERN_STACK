import mongoose from "mongoose";

const productVariantsSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    size_id: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        required: true,
    },
});

const ProductVariant = mongoose.model("ProductVariant", productVariantsSchema);

export default ProductVariant;
