import express from 'express';
import { seedProducts } from '../controllers/seedController';

const router = express.Router();

// Seed products endpoint
router.post('/products', seedProducts);

export default router;
