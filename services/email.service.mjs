import nodemailer from 'nodemailer';
import config from '../config/config.mjs';
import logger from '../config/logger.mjs';

let transport;

transport = nodemailer.createTransport(config.email.smtp);  
console.log('#######################: ', config.email.smtp)
transport.verify()
  .then(() => {
    logger.info('Connected to email server');
  })
  .catch((error) => {
    if (error.code === 'EAUTH' && error.responseCode === 535) {
      logger.warn('Authentication error: Incorrect email address or password. Please double-check your email server credentials.');
    } else if (error.code === 'EAUTH' && error.responseCode === 534) {
      logger.warn('Authentication error: Incorrect email address. Please double-check your email server credentials.');
    } else if (error.code === 'EAUTH' && error.responseCode === 535) {
      logger.warn('Authentication error: Incorrect password. Please double-check your email server credentials.');
    } else {
      logger.warn('Connection error: Unable to connect to email server. Make sure you have configured the SMTP options in .env.');
    }
  });


/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, text };
  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  try {
    const subject = 'Reset password';
    const resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`;
    const text = `Dear user,

    To reset your password, click on this link: 
    
    ${resetPasswordUrl}
    
    If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
  logger.info('email send succesfully');
  } catch (error) {
    logger.error('an error occured while sending the reset password email:',error)
  }
 
};
// sendResetPasswordEmail('kouetehuawei@gmail.com','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWQ1MDZmZTVhOWUxNTEzZTRlMTViNGMiLCJpYXQiOjE3MDg0NTk3NzQsImV4cCI6MTcwODQ2MTU3NCwidHlwZSI6ImFjY2VzcyJ9.WooZPGZM_PxD0PFbxozfjRZOE03xZ1RqfZNbV_onadg')
/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};

export {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
};
