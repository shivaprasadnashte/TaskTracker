import Todo from "@/lib/module/module";
import User from "@/lib/module/user";

export async function POST(req: Request) {
  const data = await req.json();
  const { title, description, clerkUid } = data;
  const user = await User.findOne({ clerkUid });

  if (!user) {
    return new Response("Unauhorized", { status: 404 });
  }
  const newTodo = await Todo.create({
    title,
    description,
    userId: user._id,
  });

  user.todos.push(newTodo._id);
  await user.save();

  return new Response("Hurray", { status: 200 });
}
export async function GET() {
  const todo = await Todo.find();
  return new Response(JSON.stringify(todo), {
    headers: { "content-type": "application/json" },
  });
}
