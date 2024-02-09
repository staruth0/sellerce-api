// import nodemailer from 'nodemailer';
// import * as emailConfig from '../config/config.mjs';
// import logger from '../config/logger.mjs';

// const transport = nodemailer.createTransport(emailConfig.smtp);
// /* istanbul ignore next */
// if (emailConfig.env !== 'test') {
//   transport
//     .verify()
//     .then(() => logger.info('Connected to email server'))
//     .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
// }

// /**
//  * Send an email
//  * @param {string} to
//  * @param {string} subject
//  * @param {string} text
//  * @returns {Promise}
//  */
// const sendEmail = async (to, subject, text) => {
//   const msg = { from: emailConfig.email.from, to, subject, text };
//   await transport.sendMail(msg);
// };

// /**
//  * Send reset password email
//  * @param {string} to
//  * @param {string} token
//  * @returns {Promise}
//  */
// const sendResetPasswordEmail = async (to, token) => {
//   const subject = 'Reset password';
//   const resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`;
//   const text = `Dear user,
// To reset your password, click on this link: ${resetPasswordUrl}
// If you did not request any password resets, then ignore this email.`;
//   await sendEmail(to, subject, text);
// };

// /**
//  * Send verification email
//  * @param {string} to
//  * @param {string} token
//  * @returns {Promise}
//  */
// const sendVerificationEmail = async (to, token) => {
//   const subject = 'Email Verification';
//   const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
//   const text = `Dear user,
// To verify your email, click on this link: ${verificationEmailUrl}
// If you did not create an account, then ignore this email.`;
//   await sendEmail(to, subject, text);
// };

// export {
//   transport,
//   sendEmail,
//   sendResetPasswordEmail,
//   sendVerificationEmail,
// };
