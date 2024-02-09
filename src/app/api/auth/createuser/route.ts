import User from "@/lib/module/user";
export async function POST(req: Request) {
  const { name, clerkUid, email } = await req.json();
  if (!name || !email || !clerkUid) {
    return new Response("please provide all details", { status: 500 });
  }
  const user = await User.create({ name, email, clerkUid });
  return new Response(user);
}
