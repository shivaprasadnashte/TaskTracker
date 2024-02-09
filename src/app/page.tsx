import TodoCard from "@/components/card";
import { auth } from "@clerk/nextjs";
import axios from "axios";

export default async function Home() {
  var todo;
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/todoapi`);
    todo = res.data;
  } catch (error) {
    console.error(error);
    todo = [];
  }

  return (
    <>
      {todo.map((item: any) => (
        <TodoCard
          title={item.title}
          description={item.description}
          status={item.status}
          id={item._id}
          key={item._id}
          date={item.date}
        />
      ))}
    </>
  );
}
