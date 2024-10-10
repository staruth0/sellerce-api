import httpStatus from 'http-status';
import * as tokenService from './token.service.mjs';
import * as userService from './user.service.mjs';
import Token from '../models/token.model.mjs';
import ApiError from '../utils/ApiError.mjs';
import { tokenTypes } from '../config/tokens.mjs';
import jwt from 'jsonwebtoken';
/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Token Not found');
  }
  await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    await userService.updateUserById(user.id, { password: newPassword });
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
  } catch (error) {
    // Capture and report the exact error
    console.error('An error occurred during password reset:', error.message);
    if (error instanceof ApiError) {
      throw error; // Re-throw custom API errors
    } else {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
    }
  }
};



/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (verifyEmailToken) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
    const user = await userService.getUserById(verifyEmailTokenDoc.user);
    
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'User Not Found');
    }
   
    await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
    await userService.updateUserById(user.id, { isEmailVerified: true });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Token:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *       example:
 *         Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 */
/**
 * Decodes the provided token and extracts the user ID.
 *
 * @param {string} token - The token to decode.
 * @param {string} tokenType - The type of the token (e.g., access, refresh).
 * @returns {string} - The decoded user ID.
 * @throws {Error} - If the token is invalid.
 */
const getUserIdFromToken = async (token, tokenType) => {
  try {
    
    // Verify the token
    const tokenDoc = await tokenService.verifyToken(token, tokenType);
    // Extract the user ID from the verified token document
    const userId = tokenDoc.user;
    return userId;
  } catch (error) {
    console.error(`Error verifying ${tokenType} token:`, error);
    if (error instanceof jwt.TokenExpiredError) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Token expired');
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token');
    } else {
      throw new Error(error);
    }
  }
};

export {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
  getUserIdFromToken,
};

