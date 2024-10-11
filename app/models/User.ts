import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
