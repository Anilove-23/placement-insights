import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/users.models.js"; 
import {userRolesEnum} from '../utils/constants.js'

const makeAdmin = asyncHandler(async function (req,res) {
    const {userId} = req.params
    const adminId = req.user?._id

    if(adminId.toSrring() === userId.toSrring()){
        throw new ApiError(400,"You cannot demote yourself")
    }

    if(!userId) throw new ApiError(400,"Provide User Id")
    if(!adminId) throw new ApiError(404,"User not found")

    const user = await User.findById(userId);
    if(!user) throw new ApiError(404,"User not found")

    if(user.role === 'admin') throw new ApiError(400,"User is already admin")
    

    user.role = userRolesEnum.ADMIN;
    await user.save();

    return res 
    .status(200)
    .json(
        new ApiResponse(200,{userId,role : user.role},"User is now Admin")
    )
})

export {makeAdmin}