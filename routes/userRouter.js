import express from 'express';
import {getBus, createBus, getBuses} from '../controllers/bus.js';

const router = express.Router();

router.get('/getBus', getBus);
router.get('/getBuses', getBuses);
router.post('/createBus', createBus);

export default router;
