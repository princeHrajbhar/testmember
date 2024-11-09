import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema({
  memberName: {
    type: String,
    required: true,
  },
  memberId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    reqired: true,
    unique: true,
  },
  address:{
    type: String,
    required: true,
  },
  description: String,
  position: {
    type: String,
    required: true, // Set to true instead of a string
  },
  image: {
    type: String,
    required: true,
  },
  gitUrl: {
    type: String,
  },
  linkedinUrl: String,
  portfolioUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Use a named export or default export consistently
const TeamMember = mongoose.models.TeamMember || mongoose.model("TeamMember", teamMemberSchema);

export default TeamMember; // Keep this as default export