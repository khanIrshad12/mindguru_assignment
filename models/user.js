import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone:{
      type:String,
      required:true,
    },
    gender: {
      type: String, 
      required: true,
    },
    howDidYouHear: {
      type: [String], // This should be an array to store multiple options
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    
    password: {
      type: String,
      required: true,
    },
  },
  
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
