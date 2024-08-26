"use client";
import { useEffect, useState } from "react";
import Login from "@/components/login/login";
import BrainDump from "@/components/braindump/braindump";
import PriorityTasks from "@/components/prioritytasks/prioritytasks";
import CurrentTasks from "@/components/calendar/currenttasks";
import Nav from "@/components/nav/nav";
import { Provider } from "react-redux";
import store from "./redux/store";
import axios from "axios";
import LandingPage from "@/components/landing page/landing";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          const response = await axios.get("/api/protected", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.status === 200) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem("authToken", token);
    setIsLoggedIn(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Provider store={store}>
      {isLoggedIn ? (
        <div className="">
          <LandingPage />
          <Nav onSignOut={handleSignOut} />
          <main className="w-full flex lg:flex-col flex-col gap-64 ml-3 mr-3 mt-10">
            <aside className="w-full h-full flex flex-col lg:flex-row gap-10">
              <BrainDump />
              <PriorityTasks />
            </aside>
            <section className="w-full h-full bg-white ">
              <CurrentTasks />
            </section>
          </main>
        </div>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </Provider>
  );
}
