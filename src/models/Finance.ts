import mongoose from "mongoose";

const { Schema } = mongoose;

const financeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
    },
    date: {
      type: String,
      required: true,
    },
    tipo: {
      type: Boolean,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//If the Post collection does not exist create a new one.
export default mongoose.models.Finance ||
  mongoose.model("Finance", financeSchema);
