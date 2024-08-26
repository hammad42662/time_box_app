import BrainDump from "@/components/braindump/braindump";
import CurrentTasks from "@/components/calendar/currenttasks";
import PriorityTasks from "@/components/prioritytasks/prioritytasks";

export default function AppInterface() {
  return (
    <>
      <main className="w-full flex lg:flex-col flex-col gap-64 ml-3 mr-3 mt-10">
        <aside className="w-full h-full flex flex-col lg:flex-row gap-10">
          <BrainDump />
          <PriorityTasks />
        </aside>
        <section className="w-full h-full bg-white ">
          <CurrentTasks />
        </section>
      </main>
    </>
  );
}
