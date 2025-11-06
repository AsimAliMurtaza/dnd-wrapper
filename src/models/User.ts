import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  _id: String,
  layout: { type: Array, default: [] },
});

mongoose.models.User ||
  (mongoose.models.User = mongoose.model("User", userSchema));

export default mongoose.models.User;
