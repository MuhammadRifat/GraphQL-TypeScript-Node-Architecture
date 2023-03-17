import Joi from "joi";
import { Validation } from "../common";

// login validation schema
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    role: Joi.string().valid('author', 'editor', 'reviewer', 'admin').required(),
    password: Joi.string().min(8).required(),
});

// login validation middleware
const loginValidation = new Validation(loginSchema);
const loginValidator = loginValidation.validator;

export { loginValidator };
