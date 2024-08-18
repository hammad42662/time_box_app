import { GiTimeTrap } from "react-icons/gi";

export default function NavContent() {
  return (
    <div className="flex-row justify-center items-center">
      <div className=" flex flex-row justify-center items-center gap-2">
        <span className=" border-x-2 border-y-2 px-2 py-2 ">
          <GiTimeTrap size="3rem" color="black" />
        </span>
        <h1 className="text-3xl font-bold text-zinc-800">Task Box</h1>
      </div>
      <div className="flex justify-center items-center mt-4">
        <h2 className="text-xl text-zinc-800">Your Daily Schedule Planner</h2>
      </div>
    </div>
  );
}
