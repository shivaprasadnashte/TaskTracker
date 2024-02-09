"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertCircle,
  Check,
  CheckCircle,
  SidebarClose,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  description: string;
  status: boolean;
  date: string;
  id: string;
};

function TodoCard({ title, description, date, id, status }: Props) {
  const router = useRouter();
  const [memo, setMemo] = useState(false);

  useEffect(() => {
    setMemo(true);
  }, []);

  if (!memo) {
    return null;
  }

  const tododate = new Date(date).toISOString().split("T")[0];

  async function deleteTodo() {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/todoapi/${id}`);
      router.refresh();
      toast.success("Todo deleted");
    } catch (error) {
      console.error(error);
      toast.error("An error occured");
    }
  }

  async function updateTodo() {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/todoapi/${id}`);
      router.refresh();
      toast.success("Hurrah! one step closer to success!");
    } catch (error) {
      console.error(error);
      toast.error("An error occured");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className=" flex justify-between w-full">
            <h1>{title}</h1>
            <div className=" flex gap-2">
              <Button className=" p-1" variant={"outline"} onClick={deleteTodo}>
                <X />
              </Button>
              <Button className="p-1" variant={"outline"} onClick={updateTodo}>
                <Check />
              </Button>
            </div>
          </div>
        </CardTitle>
        <CardDescription>
          {status ? (
            <div className=" flex gap-2 items-center">
              <p>COMPLETED</p>
              <CheckCircle className=" w-5 h-5 text-green-500" />
            </div>
          ) : (
            <div className=" flex gap-2">
              <p>PENDING</p>
              <AlertCircle className="w-5 h-5 text-orange-500" />
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardFooter>
        <p>{tododate}</p>
      </CardFooter>
    </Card>
  );
}

export default TodoCard;
