import httpStatus from 'http-status';
import pick from '../utils/pick.mjs';
import ApiError from '../utils/ApiError.mjs';
import catchAsync from '../utils/catchAsync.mjs';
import * as services from '../services/index.mjs';

const createUser = catchAsync(async (req, res) => {
  const user = await services.userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await services.userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await services.userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await services.userService.updateUserById(req.params.userId, req.body);
  res.status(httpStatus.OK).json({message:'Update done successfully',user});
});

const deleteUser = catchAsync(async (req, res) => {
  await services.userService.deleteUserById(req.params.userId);
  res.status(httpStatus.OK).send({message:'used deleted successfully'});
});

export {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
