import { AiFillThunderbolt } from "react-icons/ai";

export default function Protector() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white animate-pulse">
      <AiFillThunderbolt className="h-16 w-16 text-accent" />
      <h1>Please Wait</h1>
    </div>
  );
}