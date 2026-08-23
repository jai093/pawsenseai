import express from 'express';
import { protect } from '../middleware/auth';
import {
  addToHistory,
  getHistory,
  deleteHistoryItem,
  clearHistory,
} from '../controllers/historyController';

const router = express.Router();

// Protected routes (require authentication)
router.route('/')
  .post(protect, addToHistory)
  .get(protect, getHistory)
  .delete(protect, clearHistory);

router.route('/:id')
  .delete(protect, deleteHistoryItem);

export default router;
