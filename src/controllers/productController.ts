import { productModel } from '../database/models/productModel';
import { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
config();

export class ProductController {
    public async getProduct(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const id: string = req.params.id;
        const findProductById = await productModel.findOne({ idProduct: id });
        if (findProductById) {
            return res.status(200).json({ status: 200, message: findProductById });
            next();
        } else {
            return res.status(404).json({ status: 404, message: "Product not found."});
        };
    };

    public async postProduct(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { id, name, description, price } = req.body;

        if (!id) return res.status(422).json({ status: 422, message: "Undefined ID, please provide one."});
        if (!name) return res.status(422).json({ status: 422, message: "Undefined name, please provide one."});
        if (!price) return res.status(422).json({ status: 422, message: "Undefined price, please provide one."});
        const findProductById = await productModel.findOne({ idProduct: id });
        if (!findProductById) {
            try {
                await productModel.create({
                    idProduct: id,
                    name: name,
                    description: description,
                    price: price,
                });
                next();
            } catch (error) {
                return res.status(409).json({ status: 409, message: "Failed to create product."});
            };
        } else {
            return res.status(409).json({ status: 409, message: "Product already created."});
        };
    };

    public async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const id: string = req.params.id;
        const findProductById = await productModel.findOne({ idProduct: id });
        if (findProductById) {
            try {
                await productModel.deleteOne({ findProductById });
                next();
            } catch (error) {
                return res.status(409).json({ status: 409, message: "Failed to delete product."});
            };
        } else {
            return res.status(404).json({ status: 404, message: "Product not found."});
        };
    };

};
