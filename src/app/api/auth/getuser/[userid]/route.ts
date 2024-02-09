import User from "@/lib/module/user";

export async function GET(
  req: Request,
  { params }: { params: { userid: string } }
) {
  try {
    const userid = params.userid;
    if (!userid) {
      return new Response("user not exist", { status: 404 });
    }
    const user = await User.findOne({ clerkUid: userid });
    return new Response(user);
  } catch (err) {
    console.log(err);
  }
}
