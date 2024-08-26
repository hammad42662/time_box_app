export default function Instructions() {
  return (
    <div className=" flex flex-row gap-2 justify-center items-center mb-20 sm:mb-0">
      <div className=" flex flex-row gap-2 border-x-2 border-y-2 px-2 py-2 border-blue-500">
        <div className=" w-6 h-6 bg-blue-500 rounded-full"></div>
        <span className=" text-zinc-600">Brain Dump Tasks</span>
      </div>
      <hr className="  h-10 border-x border-zinc-600" />
      <div className=" flex flex-row gap-2 border-x-2 border-y-2 px-2 py-2 border-green-500">
        <div className=" w-6 h-6 bg-green-500 rounded-full"></div>
        <span className=" text-zinc-600">Priority Tasks</span>
      </div>
    </div>
  );
}
