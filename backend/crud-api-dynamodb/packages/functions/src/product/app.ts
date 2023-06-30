import awsServerlessExpress from 'aws-serverless-express';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import express, { Request, Response } from 'express';
import { ProductModel } from "@crud-api-dynamodb/core/models/Product.js";
import * as process from "process";

// Create the Express app
const app = express();
app.use(express.json());

// Get all products
app.get('/products', async (_req: Request, res: Response) => {
    try {
        const products = await ProductModel.find().exec();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a specific product by ID
app.get('/products/:productId', async (req: Request, res: Response) => {
    const { productId } = req.params;
    try {
        const product = await ProductModel.findById(productId).exec();
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new product
app.post('/products', async (req: Request, res: Response) => {
    const newProduct = req.body;
    try {
        const product = new ProductModel(newProduct);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a product
app.put('/products/:productId', async (req: Request, res: Response) => {
    const { productId } = req.params;
    const updatedProduct = req.body;
    try {
        const product = await ProductModel.findByIdAndUpdate(productId, updatedProduct, { new: true }).exec();
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a product
app.delete('/products/:productId', async (req: Request, res: Response) => {
    const { productId } = req.params;
    try {
        const product = await ProductModel.findByIdAndDelete(productId).exec();
        if (product) {
            res.json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Lambda handler function
const server = awsServerlessExpress.createServer(app);

export const handler = (event: APIGatewayProxyEvent, context: Context): void => {
    awsServerlessExpress.proxy(server, event, context);
};

// Start the server on the correct port
if (process.env.IS_LOCAL || true) {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`🚀 Rocket Rides server started: http://localhost:${process.env.PORT || 3000}`);
    });
}


