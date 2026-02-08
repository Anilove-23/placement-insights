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

const router = Router()

// POST /auth/login
// POST /auth/register
// POST /auth/logout

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/verify-email/:token').get(verifyEmail)
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password/:token').post(resetPassword)

// Secured Routes

router.route('/logout').post(verifyJwt,logout)

export default router