"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "../../../public/task-box-logo.png";
import Image from "next/image";

interface NavProps {
  onSignOut: () => void;
}

export default function Nav({ onSignOut }: NavProps) {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>("user");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await axios.post("/api/signout");
      onSignOut();
      localStorage.removeItem("username"); // Clear username on sign out
      router.push("/login");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <nav className="w-full h-full mt-10 mb-10 px-2 py-2 flex flex-row items-center ">
      <div className=" w-full h-full flex-1">
        <Image src={logo} className=" w-36 h-full object-cover" alt="" />
      </div>
      <div className=" flex flex-col gap-2 ">
        <h1 className="text-sm font-semibold">{username}</h1>
        {/* Display the username */}
        <button
          onClick={handleSignOut}
          className="bg-blue-500 self-end  md:w-36 px-1 py-1 rounded-lg text-base text-white hover:bg-blue-900"
        >
          Log Out
        </button>
      </div>
    </nav>
  );
}
