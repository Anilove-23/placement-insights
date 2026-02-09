import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        fullName: {
            type: String,
            required: true,
            trim: true
        },

        branch: {
            type: String,
            required: true,
            trim: true
        },

        graduationYear: {
            type: Number,
            required: true
        },

        cgpa: {
            type: Number,
            min: 0,
            max: 10,
            required: true
        },

        skills: [
            {
                type: String,
                lowercase: true,
                trim: true
            }
        ],


        projects: [
            {
                title: String,
                description: String,
                techStack: [String]
            }
        ],

        internships: [
            {
                company: String,
                role: String,
                duration: String
            }
        ],

        resumeUrl: String,

        approved: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

export const StudentProfile = mongoose.model("StudentProfile", studentProfileSchema);
