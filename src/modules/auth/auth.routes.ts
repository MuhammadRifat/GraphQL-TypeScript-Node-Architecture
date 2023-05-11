import express, { Router } from 'express';
import * as authController from './auth.controller';

const router: Router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);

export { router as authRouter };