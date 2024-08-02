import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    Title: {
      type: String,
      required: true,
    },
    ListTodos: [
      {
        type: mongoose.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: {
      createdAt: "createdDate",
      updatedAt: false,
    },
  }
);

export const projectModel = new mongoose.model("Project", projectSchema);
