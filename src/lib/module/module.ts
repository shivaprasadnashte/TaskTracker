import mongoose, { Types } from "mongoose";
import { type } from "os";

interface todo {
  title: string;
  description: string;
  status: boolean;
  date: Date;
  userId:Types.ObjectId;
}



const todoSchema = new mongoose.Schema<todo>({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  
});


const Todo = mongoose.models.Todo ||mongoose.model("Todo", todoSchema);
export default Todo;
export type { todo };