import {
    register,
    login,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword
} from '../controllers/auth.controllers.js'
import {verifyJwt} from '../middlewares/auth.middlewares.js'
import { Router } from 'express'
import {registerValidator,
    loginValidator,
    forgotPasswordValidator,
    resetPasswordValidator,
    verifyEmailValidator,
    logoutValidator
} from '../validators/auth.validation.js'
import {validate} from '../middlewares/validate.js'

const router = Router()

// POST /auth/login
// POST /auth/register
// POST /auth/logout

router.route('/login').post(loginValidator(),validate,login)
router.route('/register').post(registerValidator(),validate,register)
router.route('/verify-email/:token').get(verifyEmailValidator(),validate,verifyEmail)
router.route('/forgot-password').post(forgotPasswordValidator(),validate,forgotPassword)
router.route('/reset-password/:token').post(resetPasswordValidator(),validate,resetPassword)

// Secured Routes

router.route('/logout').post(verifyJwt,logoutValidator(),validate,logout)

export default router