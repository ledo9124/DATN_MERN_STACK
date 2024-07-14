import mongoose from "mongoose";

const productVariantsSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    sizeId: {
        type: String,
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
        default: "",
    },
    status: {
        type: String,
        default: 0,
    },
});

const ProductVariant = mongoose.model("ProductVariant", productVariantsSchema);

export default ProductVariant;
