import mongoose from "mongoose";

const placementSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    company: {
      type: String,
      trim: true,
      required : true
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    ctc: {
      type: Number,
      required: true,
      min: 0,
    },

    branch: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: Number,
      required: true,
    },

    offerType: {
      type: String,
      enum: ["intern", "fulltime"],
      default: "fulltime",
    },
  },
  { timestamps: true }
);

// prevent duplicates: one student should not have same company offer twice
placementSchema.index(
  { studentId: 1, companyId: 1, role: 1 },
  { unique: true }
);

export const Placement = mongoose.model("Placement", placementSchema);
