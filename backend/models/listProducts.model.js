import mongoose from "mongoose";

const listPros = new mongoose.Schema({
    cateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    listProductsId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            default: [],
        },
    ],
});

const ListProduct = mongoose.model("ListProduct", listPros);

export default ListProduct;
