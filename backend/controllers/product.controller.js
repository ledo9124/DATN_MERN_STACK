import Product from "../models/product.model.js";
import ListProducts from "../models/listProducts.model.js";
import ProductVariant from "../models/productVariants.model.js";
import validateImageUrl from "../utils/imageValidator.js";

export const getAllProVariantByProId = async (req, res) => {
    try {
        const { id: productId } = req.params;

        const productVariants = await ProductVariant.find({ productId });

        if (!productVariants) {
            return res
                .status(200)
                .json({ message: "Product variant doesn't found!" });
        }

        return res.status(200).json(productVariants);
    } catch (error) {
        console.log(
            "Error in getAllProVariantByProId controller",
            error.message
        );
        res.status(500).json({ error: "Internal server error!" });
    }
};

export const createProduct = (req, res) => {
    try {
        const { id: cateId } = req.params;
        const { name, image, description, sizes, productVariants } = req.body;

        validateImageUrl(image)
            .then(async (message) => {
                const newProduct = new Product({
                    name,
                    image,
                    description,
                });

                if (newProduct) {
                    newProduct.sizes = sizes ? [...sizes] : [];

                    const product = await newProduct.save();

                    const listProducts = await ListProducts.findOne({ cateId });

                    if (!listProducts) {
                        const newListProducts = new ListProducts({
                            cateId,
                            listProductsId: [product._id],
                        });

                        await newListProducts.save();
                    } else {
                        listProducts.listProductsId.push(product._id);

                        const listProductsUpdated =
                            await ListProducts.updateOne(
                                { cateId },
                                { listProductsId: listProducts.listProductsId }
                            );

                        if (!listProductsUpdated.acknowledged) {
                            return res
                                .status(501)
                                .json({ error: "Create listProducts false!" });
                        }
                    }

                    if (productVariants) {
                        const productId = product._id;
                        productVariants.forEach(
                            async ({
                                sizeId,
                                price,
                                image,
                                quantity,
                                description,
                            }) => {
                                if (!image) {
                                    const newProductVariant =
                                        new ProductVariant({
                                            productId,
                                            sizeId,
                                            price,
                                            quantity,
                                            description,
                                        });

                                    await newProductVariant.save();
                                } else {
                                    validateImageUrl(image)
                                        .then(async (message) => {
                                            const newProductVariant =
                                                new ProductVariant({
                                                    productId,
                                                    sizeId,
                                                    image,
                                                    price,
                                                    quantity,
                                                    description,
                                                });

                                            await newProductVariant.save();
                                        })
                                        .catch((error) => {
                                            console.log(
                                                "Error image validator",
                                                error.message
                                            );
                                            res.status(201).json({
                                                error: error.message,
                                            });
                                        });
                                }
                            }
                        );

                        return res.status(201).json({
                            message: "Create product variant successfuly!",
                        });
                    }
                }
            })
            .catch((error) => {
                console.log("Error image validator", error.message);
                res.status(201).json({ error: error.message });
            });
    } catch (error) {
        console.log(
            "Error in createProduct product controller, ",
            error.message
        );
        res.status(500).json({ error: "Internal server error!" });
    }
};

export const updateProductVariant = async (req, res) => {
    try {
        const { id: productVariantId } = req.params;
        const { sizeId, price, image, quantity, description } = req.body;

        const productVariant = await ProductVariant.findById(productVariantId);

        if (!productVariant) {
            return res
                .status(200)
                .json({ message: "Product variant doesn't found!" });
        }

        const productUpdated = await ProductVariant.findByIdAndUpdate(
            productVariantId,
            {
                sizeId: sizeId ? sizeId : productVariant.sizeId,
                price: price ? price : productVariant.price,
                image: image,
                quantity: quantity ? quantity : productVariant.quantity,
                description: description
                    ? description
                    : productVariant.description,
            },
            { new: true }
        );

        if (!productUpdated) {
            return res
                .status(404)
                .json({ error: "Product variant update false!" });
        }

        return res.status(200).json(productUpdated);
    } catch (error) {
        console.log("Error in updateProductVariant controller", error.message);
        res.status(500).json({ error: "Internal server error!" });
    }
};

export const deleteProductVariant = async (req, res) => {
    try {
        const { id: productVariantId } = req.params;

        const productDeleted = await ProductVariant.updateOne(
            { _id: productVariantId },
            { status: "1" }
        );

        if (!productDeleted.acknowledged) {
            return res
                .status(200)
                .json({ message: "Product variant delete false!" });
        }

        return res
            .status(200)
            .json({ message: "Product variant delete succesfully!" });
    } catch (error) {
        console.log("Error in deleteProductVariant controller", error.message);
        res.status(500).json({ error: "Internal server error!" });
    }
};
