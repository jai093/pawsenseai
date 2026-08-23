import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories
} from '../controllers/productController';

const router = express.Router();

// Public routes
router.route('/')
  .get(getProducts)
  .post(createProduct);

router.route('/categories')
  .get(getCategories);

router.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;
