import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider, auth, currentUser } from "@clerk/nextjs";

import "./globals.css";
import connectdb from "@/lib/dbconnection/db";
import Index from "@/components/navbar";
import { Toaster } from "sonner";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaskTracker",
  description: "Todo app to track your tasks",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connectdb();

  const user = await currentUser();

  var authUser;

  if (user) {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/getuser/${user?.id}`
      );
      authUser = res.data;
    } catch (error) {
      console.log(error);
      authUser = null;
    }
    if (!authUser) {
      const newUser = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/createuser`,
        {
          name: user?.firstName + " " + user?.lastName,
          email: user?.emailAddresses[0].emailAddress,
          clerkUid: user?.id,
        }
      );
    }
  }
  const userAuth = auth();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Index uid={userAuth.userId as string}  />
            <div className=" h-full w-full max-w-screen-lg space-y-5 p-5 mx-auto">
              {children}
            </div>
            <Toaster
              closeButton
              duration={2000}
              position="top-center"
              richColors
            />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
