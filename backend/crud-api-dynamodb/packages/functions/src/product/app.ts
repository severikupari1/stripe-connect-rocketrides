import awsServerlessExpress from 'aws-serverless-express';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import express, { Request, Response } from 'express';
import * as process from "process";
import { mongooseConnect } from "../common/database/Mongoose";
import { ProductModel } from "../common/models/Product";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger-output.json" assert { type: "json" };

console.log(swaggerFile)
mongooseConnect.then(value => {
    // console.log(value)
})
// Create the Express app
const app = express();

// https://medium.com/swlh/automatic-api-documentation-in-node-js-using-swagger-dd1ab3c78284
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))

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
    /*    #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Create new product.',
            schema: {
              "name": "Testi tuote",
              "description": "description",
              "price": 10,
              "currency": "EUR",
              "active": true
            }
    } */
    try {
        const product = new ProductModel(newProduct);
        await product.save();
         /* #swagger.responses[201] = {
                description: 'Some description...',
                schema: {
                      "name": "Testi tuote",
                      "description": "description",
                      "price": 10,
                      "currency": "EUR",
                      "active": true,
                      "_id": "64ad7c8ad87182167e7545bb",
                      "__v": 0
                }
        } */
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a product
app.put('/products/:productId', async (req: Request, res: Response) => {
    const { productId } = req.params;
    const updatedProduct = req.body;
    /*    #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Update product with id',
        schema: {
          "name": "Testi tuote",
          "description": "description",
          "price": 10,
          "currency": "EUR",
          "active": true
        }
} */
    try {
        const product = await ProductModel.findByIdAndUpdate(productId, updatedProduct, { new: true }).exec();
        if (product) {
        /* #swagger.responses[200] = {
                description: 'Found product with id',
                schema: {
                      "name": "Testi tuote",
                      "description": "description",
                      "price": 10,
                      "currency": "EUR",
                      "active": true,
                      "_id": "/products/:productId",
                      "__v": 0
                }
        } */
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


