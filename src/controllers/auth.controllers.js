import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/users.models.js'
import asyncHandler from '../utils/asyncHandler.js'
import crypto from 'crypto'
import { userRolesEnum } from '../utils/constants.js'
import { sendEmail, mailgenContent, generateForgotPasswordContent } from '../utils/sendMail.js'

const register = asyncHandler(async function (req, res) {
    const { email, password } = req.body
    const username = req.body?.username || "New User"
    const user = await User.findOne({ email })

    if (user) throw new ApiError(400, "User with this email already exists")

    const registeredUser = await User.create({
        email,
        password,
        roles: userRolesEnum.STUDENT,
        isActive: true
    })
    if (!registeredUser) throw new ApiError(400, "Something went wrong while registering user")

    const { unHashedToken, hashedToken, tokenExpiry } = registeredUser.generateTemporaryToken()

    registeredUser.emailVerificationToken = hashedToken
    registeredUser.emailVerificationTokenExpiry = tokenExpiry

    await registeredUser.save({ validateBeforeSave: false })


    await sendEmail({ mailgenContent: mailgenContent(username, `${req.protocol}://${req.get("host")}/verify-email/${unHashedToken}`), email })
    return res
        .status(200)
        .json(
            new ApiResponse(200, {
                _id: registeredUser._id,
                email: registeredUser.email,
                isEmailVerified: registeredUser.isEmailVerified,
                roles: registeredUser.roles
            }, "User registered successfully")
        )
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) throw new ApiError(404, "User not found")

    if (!user.isEmailVerified) throw new ApiError(403, "Please verify your email");

    const isValidPass = await user.isPasswordCorrect(password)
    if (!isValidPass) throw new ApiError(403, "Invalid password")

    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    }

    return res
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .status(200)
        .json(
            new ApiResponse(200, {
                user: {
                    _id: user._id,
                    email: user.email,
                    role: user.roles
                }
            }, "User LoggedIn Successfully")
        )
})


const logout = asyncHandler(async function (req, res) {
    const { _id } = req.user

    if (!_id) throw new ApiError(403, "Access Denied")

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, {
            }, "LoggedOut Successfully")
        )
})

const verifyEmail = asyncHandler(async function (req, res) {
    const { token } = req.params

    if (!token) throw new ApiError(404, "Token not found")

    const hashedToken = crypto.createHash("sha256")
        .update(token)
        .digest("hex")

    const user = await User.findOne({
        emailVerificationToken: hashedToken,
        emailVerificationTokenExpiry: { $gt: Date.now() }
    }
    )

    if (!user) throw new ApiError(400, "Invalid or expired Token")

    user.isEmailVerified = true
    user.emailVerificationToken = undefined
    user.emailVerificationTokenExpiry = undefined

    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "User Email Verified")
        )
})

const forgotPassword = asyncHandler(async function (req, res) {
    const { email } = req.body;

    if (!email) throw new ApiError(400, "Email is required");

    const user = await User.findOne({ email });
    if (!user) throw new ApiError(404, "If user exists, reset link has been sent");

    const { unHashedToken, hashedToken, tokenExpiry } =
        user.generateTemporaryToken();

    user.forgotPasswordToken = hashedToken;
    user.forgotPasswordTokenExpiry = tokenExpiry;

    await user.save({ validateBeforeSave: false });

    const resetLink = `${req.protocol}://${req.get("host")}/reset-password/${unHashedToken}`;

    await sendEmail({
        email: user.email,
        mailgenContent: generateForgotPasswordContent(user.username || "User", resetLink),
    });

    return res.status(200).json(
        new ApiResponse(200, {}, "Password reset link sent to email")
    );
});

const resetPassword = asyncHandler(async function (req, res) {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!token) throw new ApiError(400, "Reset token is required");
    if (!newPassword) throw new ApiError(400, "New password is required");

    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const user = await User.findOne({
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) throw new ApiError(400, "Invalid or expired reset token");

    user.password = newPassword;

    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password reset successful"));
});

export {
    register,
    login,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword
}
