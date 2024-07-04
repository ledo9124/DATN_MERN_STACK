import mongoose from "mongoose";

const listPros = new mongoose.Schema({
    cate_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    listProduct_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        default: [],
    }
});

const ListProduct = mongoose.model("ListProduct", listPros);

export default ListProduct;
