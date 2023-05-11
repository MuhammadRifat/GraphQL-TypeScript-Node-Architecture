import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {

    return res.status(404).json({ message: "User not found!" });

})


export {
    router as dashboardRouter,
}