import { Router } from 'express';
import { 
    forgotPasswordController, loginController, logoutController, refreshToken, 
    registerUserController, resetpassword, updateUserDetails, uploadAvatar, 
    userDetails, verifyEmailController, verifyForgotPasswordOtp 
} from '../controllers/user.controller.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';
// const { varifyJwt } = require('../utils/token')

//import { registerUserController } from '../controllers/user.controller.js';

const userRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Authentications
 *   description: Authentications operations
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 */
userRouter.post('/api/register', registerUserController);

/**
 * @swagger
 * /api/verify-email:
 *   post:
 *     summary: verify Email 
 *     tags: [Authentications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 */
userRouter.post('/api/verify-email', verifyEmailController);


/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Log in user
 *     tags: [Authentications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 */
userRouter.post('/api/login', loginController);

/**
 * @swagger
 * /api/logout:
 *   get:
 *     summary: Log out 
 *     tags: [Authentications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 */
userRouter.get('/api/logout', auth, logoutController);


/**
 * @swagger
 * /api/upload-avatar:
 *   put:
 *     summary: Upload user avatar
 *     tags: [Authentications]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Upload user avatar successfully
 */
userRouter.put('/api/upload-avatar', upload.single('avatar'), uploadAvatar);


/**
 * @swagger
 * /api/update-user:
 *   put:
 *     summary: Update User Details
 *     tags: [Authentications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               mobile:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Update User Details successfully
 */
userRouter.put('/api/update-user',  updateUserDetails);

/**
 * @swagger
 * /api/forgot-password:
 *   put:
 *     summary: Forgot User Password
 *     tags: [Authentications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Forgot User Password Details successfully
 */
userRouter.put('/api/forgot-password', forgotPasswordController);

/**
 * @swagger
 * /api/verify-forgot-password-otp:
 *   put:
 *     summary: Verify Forgot Password Otp
 *     tags: [Authentications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Verified Forgot Password Otp Details successfully
 */
userRouter.put('/api/verify-forgot-password-otp', verifyForgotPasswordOtp);


/**
 * @swagger
 * /api/reset-password:
 *   put:
 *     summary: Reset password
 *     tags: [Authentications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               newPassword:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reset password successfully
 */
userRouter.put('/api/reset-password', resetpassword);


/**
 * @swagger
 * /api/refresh-token:
 *   put:
 *     summary: Refresh Token
 *     tags: [Authentications]
 *     description:  Refresh Token
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               data: []
 *       401:
 *         description: Records not found
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: 'Records Not Founded!!!!!'
 */
userRouter.put('/api/refresh-token', refreshToken);


/**
 * @swagger
 * /api/user-details:
 *   post:
 *     summary: User Details
 *     tags: [Authentications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description:  See User Details
 */
userRouter.post('/api/user-details', userDetails);

export default userRouter;