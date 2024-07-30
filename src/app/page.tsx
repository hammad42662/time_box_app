"use client";
import { Fragment, useState } from "react";
import Login from "@/components/login/login";
import BrainDump from "@/components/braindump/braindump";
import PriorityTasks from "@/components/prioritytasks/prioritytasks";
import CurrentTasks from "@/components/calendar/currenttasks";
import Nav from "@/components/nav/nav";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <Provider store={store}>
      {isLoggedIn ? (
        <div>
          <Nav onSignOut={() => setIsLoggedIn(false)} />
          <main className="w-full flex lg:flex-col flex-col gap-64 ml-3 mr-3 mt-10">
            <aside className="w-full h-full flex flex-col lg:flex-row gap-10">
              <BrainDump />
              <PriorityTasks />
            </aside>
            <section className="w-full h-full bg-white mt-20">
              <CurrentTasks />
            </section>
          </main>
        </div>
      ) : (
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </Provider>
  );
}
