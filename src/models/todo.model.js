import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema(
  {
    Description: {
      type: String,
      required: true,
    },
    Status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "createdDate",
      updatedAt: "UpdatedDate",
    },
  }
);

export const todoModel = new mongoose.model("Todo", todoSchema);
