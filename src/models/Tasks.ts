import mongoose, { Document, Schema } from "mongoose";

export interface ITasks extends Document {
  title: string;
  startTime: Date;
  endTime: Date;
  user: mongoose.Types.ObjectId;
  priority: boolean; // Add this field if it doesn't exist
}

const taskSchema: Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  priority: {
    type: Boolean,
    default: false,
  },
});

// Use a check to prevent overwriting the model
const Task = mongoose.models.Task || mongoose.model<ITasks>("Task", taskSchema);

export default Task;
