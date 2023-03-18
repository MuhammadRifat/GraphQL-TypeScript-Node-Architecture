import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {

    return res.render("dashboard/index", {
        title: "Title",
    })

})


export {
    router as dashboardRouter,
}