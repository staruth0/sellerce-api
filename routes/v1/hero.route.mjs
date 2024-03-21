import express from 'express';
import validate from '../../middlewares/validate.mjs';
import { HeroValidation } from '../../validations/index.mjs';
import * as heroController from '../../controllers/hero.controller.mjs';

const router = express.Router();

router.get('/', validate(HeroValidation.getHeroes), heroController.getAllHeroes);
router.post('/', validate(HeroValidation.createHero), heroController.createHero);
router.get('/:heroId', validate(HeroValidation.getHero), heroController.getHeroById);
router.patch('/:heroId', validate(HeroValidation.updateHero), heroController.updateHeroById);
router.delete('/:heroId', validate(HeroValidation.deleteHero), heroController.deleteHeroById);
// Route to clear the hero collection
router.delete('/', heroController.clearHeroCollectionController);

export default router;
