import Todo from "@/lib/module/module";
export async function DELETE(
  req: Request,
  { params }: { params: { todoid: string } }
) {
  const id = params.todoid;
  const todo = await Todo.findByIdAndDelete(id);
  return new Response(JSON.stringify(todo));
}

export async function PUT(
  req: Request,
  { params }: { params: { todoid: string } }
) {
  const id = params.todoid;
  try {
    const todo = await Todo.findByIdAndUpdate(id, { status: true });
    return new Response(JSON.stringify(todo));
  } catch (error) {
    console.error(error);
    return new Response("An error occured", { status: 500 });
  }
}
