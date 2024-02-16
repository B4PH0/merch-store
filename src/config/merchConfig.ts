import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { listRoutes } from '../function/listRoutes';
import { AuthController } from '../controllers/authController';
import { UserController } from '../controllers/userController';
import { db_connection } from '../database/connect';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
config();

export class merchStore {
    private app: express.Application
    private authController: AuthController
    private userController: UserController

    constructor() {
        this.app = express();
        this.authController = new AuthController();
        this.userController = new UserController();
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
    }

    private attachRoutes(): void {
        this.app.post('/users/login', this.userController.loginConstroller);
        this.app.post('/users/register', this.userController.registerController);
        this.app.get('/private', this.authController.verifyToken, (req: Request, res: Response) => {
            return res.send('welcome to the mato');
        })
    }

    public run(): void {
        this.connectInDatabase();
        this.app.listen(process.env.API_PORT, () => {
            console.log(`API running: http://localhost:${process.env.API_PORT}`);
            console.log('Active routes: '); 
            listRoutes(this.app).forEach((routes) => {
                console.log(routes);
            })
        });
    }
}
