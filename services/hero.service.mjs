import httpStatus from 'http-status';
import Hero from '../models/hero.model.mjs';
import ApiError from '../utils/ApiError.mjs';

/**
 * Create a hero section
 * @param {Object} heroBody
 * @returns {Promise<Hero>}
 */
const createHero = async (heroBody) => {
  return Hero.create(heroBody);
};

/**
 * Query for hero sections
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<Array<Hero>>}
 */
const  queryHeroes = async (filter, options) => {
  const heroes = await Hero.find(filter, null, options);
  return heroes;
};

/**
 * Get hero by id
 * @param {ObjectId} id
 * @returns {Promise<Hero>}
 */
const getHeroById = async (id) => {
  const hero = await Hero.findById(id);
  if (!hero) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Hero not found');
  }
  return hero;
};

/**
 * Update hero by id
 * @param {ObjectId} heroId
 * @param {Object} updateBody
 * @returns {Promise<Hero>}
 */
const updateHeroById = async (heroId, updateBody) => {
  const hero = await getHeroById(heroId);
  Object.assign(hero, updateBody);
  await hero.save();
  return hero;
};

/**
 * Delete hero by id
 * @param {ObjectId} heroId
 * @returns {Promise<Hero>}
 */
const deleteHeroById = async (heroId) => {
  const hero = await getHeroById(heroId);
  await hero.remove();
  return hero;
};

/**
 * Clear the hero collection
 * @returns {Promise<void>}
 */
const clearHeroCollection = async () => {
  await Hero.deleteMany({});
};



export {
  createHero,
  queryHeroes,
  getHeroById,
  updateHeroById,
  deleteHeroById,
  clearHeroCollection,
};
