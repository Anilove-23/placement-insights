import { body, param } from "express-validator";

export const registerValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

];

export const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];


export const forgotPasswordValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email")
    .normalizeEmail(),
];


export const resetPasswordValidator = [
  param("token")
    .notEmpty()
    .withMessage("Reset token is required")
    .isString()
    .withMessage("Reset token must be a string"),

  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters long"),
];

export const verifyEmailValidator = [
  param("token")
    .notEmpty()
    .withMessage("Verification token is required")
    .isString()
    .withMessage("Verification token must be a string"),
];


export const logoutValidator = [
  body("refreshToken")
    .optional()
    .isString()
    .withMessage("Refresh token must be a string"),
];
