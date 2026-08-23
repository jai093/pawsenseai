import express from 'express';
import { protect } from '../middleware/auth';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder
} from '../controllers/orderController';

const router = express.Router();

// Protected routes (require authentication)
router.route('/')
  .post(protect, createOrder)
  .get(protect, getOrders);

router.route('/:id')
  .get(protect, getOrderById)
  .put(protect, updateOrderStatus)
  .delete(protect, cancelOrder);

export default router;
