import mongoose, { Document, Model, Schema, Types } from "mongoose";

interface UserDocument extends Document {
  name: string;
  email?: string;
  password: string;
  role: string; // 'admin' | 'user'
  participants: Types.ObjectId[];
}

const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: "Participant" }],
});

export const UserModel: Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);
