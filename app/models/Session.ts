import mongoose, { Schema, Document, Model } from "mongoose";

interface SessionDocument extends Document {
  date: string;
  startTime: string;
  endTime: string;
  participants: mongoose.Types.ObjectId[];
  hourlyRates: number[];
  shuttleFee: number;
}

const SessionSchema = new Schema<SessionDocument>({
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
