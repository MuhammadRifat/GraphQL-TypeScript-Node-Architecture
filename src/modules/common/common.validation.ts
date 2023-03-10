import { NextFunction, Request, Response } from "express";

/**
 * @objective Common validator
 * @constructor_params Schema
 * @returns validation error or validate data
 */

class Validation {
    private schema;

    constructor(schema: any) {
        this.schema = schema;
    }

    // validator middleware
    validator = (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error } = this.schema.validate(req.body, {
                abortEarly: false,
                errors: {
                    wrap: {
                        label: "",
                    },
                },
            });

            if (error) {
                let messages: any = {};
                error.details?.map((err: any) => {
                    messages[err.path[0]] = err.message;
                });
                return res.status(422).send({ success: false, errors: messages, message: "Validation Error!" });
            }
            next();
        } catch (err) {
            next(err);
        }
    }
}

export { Validation };