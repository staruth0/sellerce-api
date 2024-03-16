import express from 'express';
import * as categoryController from '../../controllers/category.controller.mjs';
import validate from '../../middlewares/validate.mjs'; 
import { categoryValidation } from '../../validations/index.mjs';

const router = express.Router();

router.post('/', validate(categoryValidation.createCategory), categoryController.createCategory);
router.put('/:categoryId', validate(categoryValidation.updateCategory), categoryController.updateCategory);
router.get('/:categoryId', validate(categoryValidation.getCategory), categoryController.getCategoryById);
router.delete('/:categoryId', validate(categoryValidation.deleteCategory), categoryController.deleteCategory);

export default router;
