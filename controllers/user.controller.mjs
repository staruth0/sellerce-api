import httpStatus from 'http-status';
import pick from '../utils/pick.mjs';
import ApiError from '../utils/ApiError.mjs';
import catchAsync from '../utils/catchAsync.mjs';
import * as services from '../services/index.mjs';

const createUser = catchAsync(async (req, res) => {
  try {
    const user = await services.userService.createUser(req.body);
    res.status(httpStatus.CREATED).send(user);
  } catch (error) {
    // Check if it's a validation error
    if (error.name === 'ValidationError') {
      // Handle validation error
      const errors = Object.values(error.errors).map((val) => val.message);
      return res.status(httpStatus.BAD_REQUEST).json({ error: errors });
    }
    // Handle other errors
    console.error('Error creating user:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
  }
});

const getUsers = catchAsync(async (req, res) => {
  try {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await services.userService.queryUsers(filter, options);
    res.send(result);
  } catch (error) {
    // Handle the error appropriately
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
});

const getUser = catchAsync(async (req, res) => {
  try {
    const user = await services.userService.getUserById(req.params.userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.send(user);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).send({ error: error.message });
    } else {
      console.error('Error fetching user:', error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Internal Server Error' });
    }
  }
});


const updateUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const existingUser = await services.userService.getUserById(userId);
  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // User exists, proceed with the update
  const updatedUser = await services.userService.updateUserById(userId, req.body);
  res.status(httpStatus.OK).json({ message: 'Update done successfully', user: updatedUser });
});

const deleteUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const existingUser = await services.userService.getUserById(userId);
  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // User exists, proceed with deletion
  await services.userService.deleteUserById(userId);
  res.status(httpStatus.OK).send({ message: 'User deleted successfully' });
});


export {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
