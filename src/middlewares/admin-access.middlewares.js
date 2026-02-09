import { AdminProfile } from "../models/admin.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {userRoles} from '../utils/constants.js'
import {User} from '../models/users.models.js'

const authorize = (...allowedRoles) =>
  asyncHandler(async (req, res, next) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");

    if (!allowedRoles.includes(req.user.role)) {
      throw new ApiError(403, "Access Denied");
    }

    next();
  });
