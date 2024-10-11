import mongoose from "mongoose";

const connect = async () => {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(process.env.MONGODB_URI as string);
};

export default connect;
