import express from 'express';
import driverRouter from './driverRouter.js';
import userRouter from './userRouter.js';

const router = express.Router();

router.use(userRouter, driverRouter);

export default router;
