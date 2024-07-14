import express from "express";
import {
    createProduct,
    deleteProductVariant,
    getAllProVariantByProId,
    updateProductVariant,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/:id", getAllProVariantByProId);
router.post("/create/:id", createProduct);
router.put("/updateProduct/:id", updateProductVariant);
router.get("/deleteProduct/:id", deleteProductVariant);

export default router;
