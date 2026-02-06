import mongoose from "mongoose";

const adminProfileSchema = new mongoose.Schema(
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

    department: {
      type: String
    },

    permissions: {
      type: [String],
      default: [
        "VIEW_STUDENTS",
        "VERIFY_STUDENTS"
      ]
    }
  },
  { timestamps: true }
);

export default mongoose.model("AdminProfile", adminProfileSchema);
