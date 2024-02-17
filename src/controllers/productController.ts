import { productModel } from '../database/models/productModel';
import { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
config();

export class ProductController {
    public async getProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        const name: string = req.params.name;
        await productModel.findOne({ name: name}).then((item) => {
            return res.status(200).json({ status: 200, message: item});
            next();
        }).catch((error) => {
            return res.status(409).json({ status: 409, error: error});
        });
    };

    public async postProduct(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { name, description, price } = req.body;
        
        if (!name) return res.status(422).json({ status: 422, message: "Undefined name, please provide one."});
        if (!price) return res.status(422).json({ status: 422, message: "Undefined price, please provide one."});
        const findProductByName = await productModel.findOne({ name: name }).then(() => {
            return res.status(409).json({ status: 409, message: "Product already exists, please try another product."});
        });

        if (!description) {
            try {
                await productModel.create({
                    name: name,
                    description: undefined,
                    price: price
                });
                next();
            } catch (error) {
                return res.status(409).json({ status: 409, message: "Product creation failed."});
            };
        } else {
            try {
                await productModel.create({
                    name: name,
                    description: description,
                    price: price
                });
                next();
            } catch (error) {
                return res.status(409).json({ status: 409, message: "Product creation failed."});
            };
        };
    };

    public async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { name } = req.body;
        
        await productModel.deleteOne({ name: name }).then(() => {
            return res.status(200).json({ status: 200, message: "Completed product disposal."});
            next();
        });
    };

};
