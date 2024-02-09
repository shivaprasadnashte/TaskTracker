"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

const formschema = z.object({
  title: z
    .string()
    .min(3, { message: "Title should be atleast 3 characters long" })
    .max(20, { message: "Title should be atmost 20 characters long" }),
  description: z
    .string()
    .min(3, { message: "Description should be atleast 3 characters long" })
    .max(100, { message: "Description should be atmost 100 characters long" }),
});

function Addtodo({uid}:{uid:string}) {
  const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formschema>) {
    try {
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/todoapi`, {
        ...values,
        clerkUid: uid,
      });
      toast.success("Todo added");
      router.refresh();
    } catch (e) {
      console.log(e);
      toast.error("An error occured");
    } finally {
      form.reset();
    }
  }
  const [memo, setMemo] = useState(false);
  useEffect(() => {
    setMemo(true);
  }, []);

  if (!memo) {
    return null;
  }

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button className="bg-purple-700 hover:bg-purple-500 text-white text-2xl">
            <PlusIcon className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add ToDo</DialogTitle>
            <DialogDescription>Add a new task to your list</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="title" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="description" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button size={"lg"} type="submit">
                Add
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Addtodo;
