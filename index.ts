import express, { Application, NextFunction, Request, Response } from "express";
import { buildSchema } from "graphql";


const app: Application = express();

app.get("/", (req: Request, res: Response, next: NextFunction) => {

    return res.status(200).json({ message: "Bismillah" });
});

// handling error for mismatched routes
app.use((req: Request, res: Response, next: NextFunction) => {
    try {
        throw Error("Route not found!");
    } catch (error) {
        next(error);
    }
});

// error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).json({ message: err.message, stack: err.stack });
});

app.listen(3000, () => {
    console.log("Server is listening on the port 3000");
});