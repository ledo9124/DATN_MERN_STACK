import Category from "../models/category.model.js";
import validateImageUrl from "../utils/imageValidator.js";

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({ status: "0" });

        if (!categories) {
            return res.status(200).json({ message: "Category doesn't found!" });
        }

        res.status(200).json(categories);
    } catch (error) {
        console.log(
            "Error getAllCategories in category controller ",
            error.message
        );
        res.status(500).json({ error: "Interval server error!" });
    }
};

export const createCategory = async (req, res) => {
    try {
        const { name, image, description } = req.body;

        validateImageUrl(image)
            .then(async (message) => {
                const newCategory = new Category({
                    name,
                    image,
                    description: description ? description : "",
                });

                if (newCategory) {
                    await newCategory.save();

                    res.status(201).json({
                        _id: newCategory._id,
                        name: newCategory.name,
                        imgae: newCategory.image,
                        description: newCategory.description,
                    });
                }
            })
            .catch((error) => {
                console.log("Error image validator", error.message);
                res.status(201).json({ error: error.message });
            });
    } catch (error) {
        console.log(
            "Error createCategory in category controller",
            error.message
        );
        res.status(500).json({ error: "Interval server error!" });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const cateId = req.params.id;
        console.log(cateId);
        const { name, image, description } = req.body;

        const category = await Category.findOne({ _id: cateId });

        if (!category) {
            return res.status(201).json({ message: "Category doesn't found!" });
        }

        if (!image) {
            const categoryUpdated = await Category.findOneAndUpdate(
                { _id: cateId },
                {
                    name: name ? name : category.name,
                    description: description
                        ? description
                        : category.description,
                },
                { new: true }
            );

            if (categoryUpdated) {
                return res.status(201).json({
                    _id: categoryUpdated._id,
                    name: categoryUpdated.name,
                    image: categoryUpdated.image,
                    description: categoryUpdated.description,
                });
            }
        }

        validateImageUrl(image)
            .then(async (message) => {
                const categoryUpdated = await Category.findOneAndUpdate(
                    { _id: cateId },
                    {
                        name: name ? name : category.name,
                        image: image,
                        description: description
                            ? description
                            : category.description,
                    },
                    { new: true }
                );

                if (categoryUpdated) {
                    return res.status(201).json({
                        _id: categoryUpdated._id,
                        name: categoryUpdated.name,
                        image: categoryUpdated.image,
                        description: categoryUpdated.description,
                    });
                }
            })
            .catch((error) => {
                console.log("Error image validator", error.message);
                res.status(201).json({ error: error.message });
            });
    } catch (error) {
        console.log("Error in updateCategory controller", error.message);
        res.status(500).json({ error: "Interval server errorr!" });
    }
};

export const delCategory = async (req, res) => {
    try {
        const cateId = req.params.id;

        const categoryDel = await Category.findByIdAndUpdate(
            cateId,
            {
                status: "1",
            },
            { new: true }
        );

        if (categoryDel) {
            res.status(200).json(categoryDel);
        } else {
            res.status(200).json({ message: "Category isn't match!" });
        }
    } catch (error) {
        console.log("Error in delCategory controller", error.message);
        res.status(500).json({ error: "Interval server error!" });
    }
};
