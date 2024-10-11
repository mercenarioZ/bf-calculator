import mongoose, { Schema } from "mongoose";

const registrationSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },
});

const Registration =
  mongoose.models.Registration ||
  mongoose.model("Registration", registrationSchema);

export default Registration;
