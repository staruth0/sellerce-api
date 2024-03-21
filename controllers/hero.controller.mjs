import httpStatus from 'http-status';
import * as heroService from '../services/hero.service.mjs';
import catchAsync from '../utils/catchAsync.mjs';

/**
 * Create a new hero
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const createHero = catchAsync(async (req, res) => {
  const hero = await heroService.createHero(req.body);
  res.status(httpStatus.CREATED).send(hero);
});

/**
 * Get all heroes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getAllHeroes = catchAsync(async (req, res) => {
  // Parse filter and options from query parameters
  const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
  
  // Adjust options to include sorting by createdAt in descending order
  const options = req.query.options ? JSON.parse(req.query.options) : {};
  options.sort = { createdAt: -1 }; // Sort by createdAt in descending order (latest to oldest)

  // Call your service function passing these filter and options
  const heroes = await heroService.queryHeroes(filter, options);

  // Send the response
  res.send(heroes);
});


/**
 * Get hero by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const getHeroById = catchAsync(async (req, res) => {
  const hero = await heroService.getHeroById(req.params.heroId);
  res.send(hero);
});

/**
 * Update hero by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const updateHeroById = catchAsync(async (req, res) => {
  const hero = await heroService.updateHeroById(req.params.heroId, req.body);
  res.send(hero);
});

/**
 * Delete hero by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const deleteHeroById = catchAsync(async (req, res) => {
  await heroService.deleteHeroById(req.params.heroId);
  res.status(httpStatus.NO_CONTENT).end();
});

/**
 * Clear the hero collection
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const clearHeroCollectionController = catchAsync(async (req, res) => {
  await heroService.clearHeroCollection();
  res.status(httpStatus.NO_CONTENT).end();
});

export {
  createHero,
  getAllHeroes,
  getHeroById,
  updateHeroById,
  deleteHeroById,
  clearHeroCollectionController,
};
