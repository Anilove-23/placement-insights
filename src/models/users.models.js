import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const userSchema = new mongoose.Schema(
  {

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },

    password: {
      type: String,
      required: true
    },

    forgotPasswordToken : {
      type : String
    },

    forgotPasswordTokenExpiry : {
        type : Date
    },

    role: {
      type: String,
      required: true
    },

    refreshToken: {
      type: String
    },

    isActive: {
      type: Boolean,
      default: true
    },

    isEmailVerified : {
      type : Boolean,
      default : false
    },

    emailVerificationToken : {
      type : String,
      trim : true
    },

    emailVerificationTokenExpiry : {
      type : Date
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { id: this._id, email: this.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  )
}

userSchema.methods.generateRefreshToken = function () {
  jwt.sign(
    {
      id: this._id,
      email: this.email
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  )
}

userSchema.methods.generateTemporaryToken = function(){
    const unHashedToken = crypto.randomBytes(20).toString("hex")

    const hashedToken = crypto.createHash("sha256")
                      .update(unHashedToken)
                      .digest("hex")

    const tokenExpiry = Date.now() + 20*1000*60

    return {unHashedToken,hashedToken,tokenExpiry}
}

export const User = mongoose.model("User", userSchema);
