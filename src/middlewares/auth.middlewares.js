import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'
import {User} from '../models/users.models.js'

const verifyJwt = asyncHandler(async function (req,res,next) {
    const token = req.cookies?.accessToken || rreq.headers.authorization?.replace("Bearer ", "").replace("bearer ", "")
    if(!token) throw new ApiError(401,"INVALID TOKEN")

    const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    if(!decoded) throw new ApiError(403,"Token Expired")

    const user = await User.findOne({_id : decoded._id}).select('_id role')
    if(!user) throw new ApiError(400,"Access Denied")
    
    req.user = user 

    next()
})

