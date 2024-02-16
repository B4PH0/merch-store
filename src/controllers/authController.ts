import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
config();

export class AuthController {
    
    public verifyToken(req: Request, res: Response, next: NextFunction) {
        const token: string = req.cookies.token;
        jwt.verify(token, process.env.SECRET, (err) => {
            if (err) return res.status(401).json({ status: 401, message: 'Access denied'});
            next();
        });
    };
};
