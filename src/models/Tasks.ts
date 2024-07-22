import mongoose, { Document, Schema } from "mongoose";

export interface ITasks extends Document {
  name: string;
  startTime: string;
  endTime: string;
}

const taskSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

// Use a check to prevent overwriting the model
const Task =
  mongoose.models.Tasks || mongoose.model<ITasks>("Tasks", taskSchema);

export default Task;
