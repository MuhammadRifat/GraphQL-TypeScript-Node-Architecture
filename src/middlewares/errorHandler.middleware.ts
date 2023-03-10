import { NextFunction, Request, Response } from "express";
import config from "../../config/config";
import logger from "../logger/logger";

export default class ErrorHandler {
    static errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
        logger.error(err.message);
        return res.status(config.statusCode.INTERNAL_SERVER_ERROR).json({ code: config.statusCode.INTERNAL_SERVER_ERROR, message: err.message });
    };
}