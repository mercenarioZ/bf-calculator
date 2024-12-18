import mongoose, { Schema, Document, Model } from "mongoose";
import { Participant } from "../types";

// define the Participant interface
export interface ParticipantDocument extends Participant, Document {}

export const ParticipantSchema = new Schema<ParticipantDocument>({
  name: { type: String, required: true },
  minutesPlayed: { type: Number },
  hourlyFee: { type: Number },
  shuttleFee: { type: Number },
  totalFee: { type: Number },
});

// create the Participant model
const ParticipantModel: Model<ParticipantDocument> =
  mongoose.models.Participant ||
  mongoose.model<ParticipantDocument>("Participant", ParticipantSchema);

export default ParticipantModel;
