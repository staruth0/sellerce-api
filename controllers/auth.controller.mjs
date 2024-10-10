import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.mjs';
import catchAsync from '../utils/catchAsync.mjs';
import { authService, userService, tokenService, emailService } from '../services/index.mjs';

const register = catchAsync(async (req, res,next) => {
  try {
    const user = await userService.createUser(req.body);
    const tokens = await tokenService.generateAuthTokens(user);
    req.session.number_of_page=5
    const session= await req.session;
    const num=req.session.number_of_page
    res.status(httpStatus.CREATED).send({ user, tokens,session });
  } catch (error) {
    next(error)
  }
});

const login = catchAsync(async (req, res,next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const tokens = await tokenService.generateAuthTokens(user);
    const session= await req.session;
    res.send({ user, tokens,session });
  } catch (error) {
    next(error)
  }
});

const logout = catchAsync(async (req, res,next) => {
  try {
    await authService.logout(req.body.refreshToken);
    res.status(httpStatus.OK).send("logout successful");
  } catch (error) {
    next(error);
  }
});

const refreshTokens = catchAsync(async (req, res,next) => {
  try {
    const tokens = await authService.refreshAuth(req.body.refreshToken);
    res.send({ ...tokens });
  } catch (error) {
    next(error);
  }
});

const forgotPassword = catchAsync(async (req, res,next) => {
 try {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.OK).send();
 } catch (error) {
   next(error);
 }
});

const resetPassword = catchAsync(async (req, res,next) => {
  try {
    await authService.resetPassword(req.query.token, req.body.password);
    await emailService.sendEmailVerificationConfirmationEmail(req.body.email,req.query.token)
    res.status(httpStatus.OK).send('Password resetted successfully');
  } catch (error) {
    next(error);
  }
});

const sendVerificationEmail = catchAsync(async (req, res,next) => {
  try {
    const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
    const result=await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
    res.status(httpStatus.OK).send('email sent successfully');
  } catch (err) {
     next(err);
  }
});

const verifyEmail = catchAsync(async (req, res, next) => {
  try {
    await authService.verifyEmail(req.query.token);
    res.status(httpStatus.OK).send('verication successfull');
  } catch (error) {
    next(error);
  }
});

const getTokenUserId = async (req, res, next) => {
  try {
    const { token, tokenType } = req.body;
    if (!token || !tokenType) {
      return res.status(400).json({ error: 'Token and tokenType are required' });
    }
    const userId = await authService.getUserIdFromToken(token, tokenType);
    res.status(200).json({ userId });
  } catch (error) {
    next(error);
  }
};

export {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  getTokenUserId,
};
