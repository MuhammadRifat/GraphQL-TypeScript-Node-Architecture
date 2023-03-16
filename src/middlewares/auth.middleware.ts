import { NextFunction, Request, Response } from "express";

const auth = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.session.user) {
            return res.redirect('/login');
        }

        next();
    }
};

export { auth };