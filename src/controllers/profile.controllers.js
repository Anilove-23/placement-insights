import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { StudentProfile } from '../models/studenetProfile.models.js'
import asyncHandler from '../utils/asyncHandler.js'
import { AdminProfile } from '../models/admin.models.js'
// Fields:
// - Name, branch, graduation year  
// - CGPA  
// - Skills (tags)  
// - Internships  
// - Projects  
// - Certifications  

const updateMeStudent = asyncHandler(async function (req, res) {
    const userId = req.user?._id

    const allowedFields = [
        "name",
        "branch",
        "graduationYear",
        "cgpa",
        "skills",
        "internships",
        "projects",
        "certifications"
    ];

    const updates = {}

    allowedFields.forEach((field)=>{
        if(req.body[field] !== undefined){
            updates[field] = req.body[field]
        }
    })

    if(Object.keys(updates).length === 0){
        throw new ApiError(400,"Nothing to update")
    }

    const updatedUser = await StudentProfile.findByIdAndUpdate(userId,
        {$set : updates},
        {new : true, runValidators : true}
    )

     if (!updatedUser) {
    throw new ApiError(404, "Student profile not found");
  }

    return res
    .status(200)
    .json(
        new ApiResponse(200,updatedUser,"User Profile updated successfully")
    )
})

const updateMeAdmin = asyncHandler(async function (req,res) {
    const adminId = req.user?._id 

    const allowedFields = [
        "name",
        "department"
    ]

    const updates = {}

    allowedFields.forEach((field)=>{
        if(req.body[field] !== undefined){
            updates[field] = req.body[field]
        }
    })

    if(Object.keys(updates).length === 0){
        throw new ApiError(400,"Nothing to update")
    }

    const admin = await AdminProfile.findByIdAndUpdate(adminId,
        {$set : updates},
        {new : true , runValidators : true}
    )

    if(!admin) throw new ApiError(404,"profile not found or something wrong occurred")

    return res
    .status(200)
    .json(
        new ApiResponse(200,{admin},"Admin Profile Updated Successfully")
    )
})

