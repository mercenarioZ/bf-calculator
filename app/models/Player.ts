import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Player = mongoose.models.playerSchema || mongoose.model("Player", playerSchema);

export default Player;
