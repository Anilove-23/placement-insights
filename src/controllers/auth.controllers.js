import {ApiResponse} from '../utils/ApiResponse.js'
import {ApiError} from '../utils/ApiError.js'
import { User } from '../models/users.models.js'  
import asyncHandler from '../utils/asyncHandler.js'
import mongoose from 'mongoose'
import {userRolesEnum} from '../utils/constants.js'

const register = asyncHandler(async function (req,res) {
    const {email , password} = req.body

    const user = await User.create({email})

    if(user) throw new ApiError(400,"User with this email already exists")

    const registeredUser = await User.insertOne({
        email,
        password,
        roles : userRolesEnum.STUDENT,
        isActive : true
    })

    if(!registeredUser) throw new ApiError(400,"Something went wrong while registering user")
    
    return res
    .status(200)
    .json(
        new ApiResponse(200,{registeredUser},"User registered successfully")
    )
})
