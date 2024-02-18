import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { listRoutes } from '../function/listRoutes';
import { AuthController } from '../controllers/authController';
import { UserController } from '../controllers/userController';
import { db_connection } from '../database/connect';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import { ProductController } from '../controllers/productController';
config();

export class merchStore {
    private app: express.Application
    private authController: AuthController
    private userController: UserController
    private productController: ProductController

    constructor() {
        this.app = express();
        this.authController = new AuthController();
        this.userController = new UserController();
        this.productController = new ProductController();
        this.config();
    };

    private config(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.attachRoutes();
    };

    private connectInDatabase(): void {
        db_connection.on('error', (err) => console.log(err));
        db_connection.once('open', () => console.log('Stabilized MongoDB connection'));
    };

    private attachRoutes(): void {
        // User routes
        this.app.post('/users/login', this.userController.loginConstroller);
        this.app.post('/users/register', this.userController.registerController);
        
        // Product routes  
        this.app.get('/product/view/:id', this.authController.verifyToken, this.productController.getProduct);
        this.app.post('/product/create/', this.authController.verifyToken, this.productController.postProduct);
        this.app.delete('/product/delete/:id', this.authController.verifyToken, this.productController.deleteProduct);
    };

    public run(): void {
        this.connectInDatabase();
        this.app.listen(process.env.API_PORT, () => {
            console.log(`API running: http://localhost:${process.env.API_PORT}`);
            console.log('Active routes: '); 
            listRoutes(this.app).forEach((routes) => {
                console.log(routes);
            });
        });
    };
};
