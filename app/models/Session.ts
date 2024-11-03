import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { ParticipantDocument } from "./Participant";

export interface SessionDocument extends Document {
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  participants: (Types.ObjectId | ParticipantDocument)[];
  hourlyRates: number[];
  shuttleFee: number;
}

const SessionSchema = new Schema<SessionDocument>({
  name: { type: String, required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: "Participant" }],
  hourlyRates: { type: [Number], required: true },
  shuttleFee: { type: Number, required: true },
});

const Session: Model<SessionDocument> =
  mongoose.models.Session ||
  mongoose.model<SessionDocument>("Session", SessionSchema);

export default Session;
