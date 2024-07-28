"use client";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Montserrat } from "next/font/google";
import BrainDump from "@/components/braindump/braindump";
import PriorityTasks from "@/components/prioritytasks/prioritytasks";
import CurrentTasks from "@/components/calendar/currenttasks";
import Nav from "@/components/nav/nav";
import Login from "@/components/login/login";
import { useState } from "react";
const montserrat = Montserrat({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
});
export default function Home() {
  const [login, setLogin] = useState(null);
  return (
    <>
      <Provider store={store}>
        <Nav />
        <Login />
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
