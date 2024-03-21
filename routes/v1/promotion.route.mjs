// promotion.routes.mjs

import express from 'express';
import * as promotionController from '../../controllers/promotion.controller.mjs';
import validate from '../../middlewares/validate.mjs'; 
// Import promotion validation schemas
import { createPromotionSchema, updatePromotionSchema, cancelPromotionSchema, getPromotionsSchema } from '../../validations/promotion.validation.mjs';

const router = express.Router();

router.post('/', validate(createPromotionSchema), promotionController.createPromotion);
router.put('/:promotionId', validate(updatePromotionSchema), promotionController.updatePromotion);
router.delete('/:promotionId', validate(cancelPromotionSchema), promotionController.cancelPromotion);
router.get('/', validate(getPromotionsSchema), promotionController.getAllPromotions);
router.get('/latest', promotionController.getLatestPromotion);
router.get('/:promotionId', promotionController.getPromotionById);

export default router;

