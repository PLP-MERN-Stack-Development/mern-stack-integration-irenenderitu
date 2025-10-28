import express from 'express';
import { getCategories, createCategory } from '../controllers/categoryController.js';
import { protect } from '../middleware/auth.js';
import { validateCategory } from '../middleware/validation.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', protect, validateCategory, createCategory);

export default router;