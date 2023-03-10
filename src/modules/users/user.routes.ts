import express, { Router } from 'express';
import * as userController from './user.controller';

const router: Router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);

export { router as userRouter };