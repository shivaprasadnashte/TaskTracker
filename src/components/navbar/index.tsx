import Image from "next/image";
import { ModeToggle } from "../modetoggel";
import Addtodo from "../Addtodo";
import { UserButton } from "@clerk/nextjs";
function Index({ uid }: { uid: string }) {
  return (
    <>
      <div className="w-full p-5 flex items-center justify-between max-w-screen-6xl">
        <Image src="/logo.svg" alt="Vercel Logo" width={50} height={16} />
        <div className=" flex justify-center items-center gap-5">
          <Addtodo uid={uid} />
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </>
  );
}

export default Index;
