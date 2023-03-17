import Joi from "joi";
import { Validation } from "../common";

// user validation schema
const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid('author', 'editor', 'reviewer', 'admin').required(),
    password: Joi.string().min(8).required(),
});

// user validation middleware
const userValidation = new Validation(userSchema);
const userValidator = userValidation.validator;

export { userValidator };
