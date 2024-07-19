"use client";
import { Provider } from "react-redux";
import BrainDump from "./components/braindump";
import CurrentTasks from "./components/currenttasks";
import PriorityTasks from "./components/prioritytasks";
import store from "./redux/store";
import { Montserrat } from "next/font/google";
import Guide from "./components/guide";
const montserrat = Montserrat({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
});
export default function Home() {
  return (
    <>
      <Provider store={store}>
        {/* <nav className=" w-full h-full bg-blue-900  ">
          <h1 className=" text-center text-3xl text-white">
            {" "}
            Welcome To Time Box App
          </h1>
        </nav> */}
        {/* <Guide /> */}
        <main
          className={` ${montserrat.className} w-full flex lg:flex-col flex-col gap-64 ml-3 mr-3 mt-10`}
        >
          <aside className="w-full h-full flex flex-col lg:flex-row   gap-10">
            {/* left top --- top prorities */}
            <BrainDump />
            {/* left bottom -- Brain Dum  */}
            <PriorityTasks />
          </aside>
        </main>
        <section className=" w-full h-full bg-white mt-20">
          <CurrentTasks />
        </section>
      </Provider>
    </>
  );
}
