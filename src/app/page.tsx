"use client";
import { Provider } from "react-redux";
import BrainDump from "./components/braindump";
import CurrentTasks from "./components/currenttasks";
import PriorityTasks from "./components/prioritytasks";
import store from "./redux/store";

export default function Home() {
  return (
    <>
      <Provider store={store}>
        <nav className=" w-full h-full bg-blue-900  ">
          <h1 className=" text-center text-3xl text-white">
            {" "}
            Welcome To Time Box App
          </h1>
        </nav>
        <main className=" w-full flex lg:flex-col flex-col gap-64 ml-3 mr-3 mt-10">
          <aside className="w-full h-full flex flex-row  bg-slate-400 gap-10">
            {/* left top --- top prorities */}
            <BrainDump />
            {/* left bottom -- Brain Dum  */}
            <PriorityTasks />
          </aside>
          {/* right full tasks  */}

          <section className=" w-full h-full bg-white mt-0">
            <CurrentTasks />
          </section>
        </main>
      </Provider>
    </>
  );
}
