import BrainDump from "@/components/braindump/braindump";
import CurrentTasks from "@/components/calendar/currenttasks";
import PriorityTasks from "@/components/prioritytasks/prioritytasks";
import Instructions from "./Instructions";

export default function AppInterface() {
  return (
    <>
      <main className="w-full flex lg:flex-col flex-col gap-40 mt-10">
        <section className="w-full h-full flex flex-col justify-center items-center gap-20 ">
          <BrainDump />
          <PriorityTasks />
        </section>
        <Instructions />
        <section className="w-full h-full bg-white ">
          <CurrentTasks />
        </section>
      </main>
    </>
  );
}
