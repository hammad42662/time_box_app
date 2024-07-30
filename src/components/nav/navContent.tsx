import { GiTimeTrap } from "react-icons/gi";

export default function NavContent() {
  return (
    <div className="flex-row justify-center items-center">
      <div className=" flex flex-row justify-center items-center">
        <span>
          <GiTimeTrap size="5rem" color="" />
        </span>
        <span className="text-3xl font-bold">Time Box</span>
      </div>
      <div className="flex justify-center items-center mt-4">
        <h2 className="text-2xl">Your Daily Schedule Planner</h2>
      </div>
    </div>
  );
}
