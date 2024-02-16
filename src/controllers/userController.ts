import { Request, Response, NextFunction } from 'express';
import { userModel } from '../database/models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export class UserController {

    public async registerController(req: Request, res: Response, next: NextFunction) {
        const { name, email, password } = req.body;
        if (!name) return res.status(422).json({ status: 422, message: "Undefined name, please provide one."});
        if (!email) return res.status(422).json({ status: 422, message: "Undefined email, please provide one."});
        if (!password) return res.status(422).json({ status: 422, message: "Undefined password, please provide one."});

        const findUserByEmail = await userModel.findOne({ email: email });
        if (!findUserByEmail) {
            const passwordEncripted: string = await bcrypt.hash(password, 12);
            const userCreated = await userModel.create({
                name: name,
                email: email,
                password: passwordEncripted
            });
            if (userCreated) {
                return res.status(201).json({ status: 201, message: "User created."})
                next();  
            };
        } else return res.status(409).json({ status: 409, message: "Email already logged in, try another one."});
    };

    public async loginConstroller(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        if (!email) return res.status(422).json({ status: 422, message: "Undefined email, please provide one."});
        if (!password) return res.status(422).json({ status: 422, message: "Undefined password, please provide one."});

        const findUserByEmail = await userModel.findOne({ email: email });
        if (findUserByEmail) {
          const comparePassword: boolean = await bcrypt.compare(password, findUserByEmail.password);
          if (comparePassword) {
            const token: string = jwt.sign({ id: findUserByEmail._id }, process.env.SECRET, { expiresIn: 300});
            res.cookie('token', token, { httpOnly: true });
            return res.status(200).json({ status: 200, message: "Authorization made."});
            next();
          } else return res.status(401).json({ status: 401, message: "Password does not match."});
        } else return res.status(422).json({ status: 422, message: "User not found."});
    };
};