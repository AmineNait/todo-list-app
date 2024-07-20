import mongoose, { Document, Schema } from "mongoose";

export interface ITodo extends Document {
  title: string;
  description?: string;
  completed: boolean;
}

const TodoSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model<ITodo>("Todo", TodoSchema);
