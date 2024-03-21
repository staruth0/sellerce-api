import express from 'express';
import * as categoryController from '../../controllers/category.controller.mjs';
import validate from '../../middlewares/validate.mjs'; 
import { categoryValidation } from '../../validations/index.mjs';

const router = express.Router();

router.post('/', validate(categoryValidation.createCategory), categoryController.createCategory);
router.put('/:categoryId', validate(categoryValidation.updateCategory), categoryController.updateCategory);
router.get('/id/:categoryId', validate(categoryValidation.getCategory), categoryController.getCategoryById);
// Route to get category by name
router.get('/byName/:name', categoryController.getCategoryByName);
router.get('/', categoryController.getAllCategories);
router.delete('/:categoryId', validate(categoryValidation.deleteCategory), categoryController.deleteCategory);

export default router;
