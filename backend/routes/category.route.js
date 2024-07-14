import express from "express";

import {
    createCategory,
    delCategory,
    getAllCategories,
    updateCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

router.get("/", getAllCategories);
router.post("/createCategory", createCategory);
router.put("/updateCategory/:id", updateCategory);
router.get("/delCategory/:id", delCategory);

export default router;
