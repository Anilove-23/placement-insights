import mongoose from "mongoose";

const superAdminProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    fullName: {
      type: String,
      required: true
    },

    permissions: {
      type: [String],
      default: [
        "CREATE_ADMIN",
        "DELETE_ADMIN",
        "SYSTEM_CONFIG",
        "FULL_ACCESS"
      ]
    }
  },
  { timestamps: true }
);

export default mongoose.model("SuperAdminProfile", superAdminProfileSchema);
