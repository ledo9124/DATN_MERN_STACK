import express from "express";
import "dotenv/config";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

import categoryRoutes from "./routes/category.route.js";
import productRoutes from "./routes/product.route.js";
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen(port, () => {
    connectToMongoDB();
    console.log(`Example app listening on port ${port}`);
});
