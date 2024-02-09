import mongoose, { Types } from "mongoose";

interface user {
  name: string;
  email: string;
  clerkUid: string;
  todos: Array<Types.ObjectId>;
}

const userSchema = new mongoose.Schema<user>({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  clerkUid: {
    type: String,
    required: true,
  },
  todos: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Todo",
    },
  ],
});
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
