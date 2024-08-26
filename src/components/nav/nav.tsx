"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import logo from "../../../public/task-box-logo.png";
import Image from "next/image";

interface NavProps {
  onSignOut: () => void;
}

export default function Nav({ onSignOut }: NavProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await axios.post("/api/signout");
      onSignOut();
      router.push("/login");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <nav className="w-full h-full mt-10 mb-10 px-2 py-2 flex flex-row justify-evenly">
      <Image src={logo} className=" w-36 h-full" alt="" />

      <h1 className="text-3xl font-semibold">Welcome User</h1>

      <button
        onClick={handleSignOut}
        className="  bg-blue-500 w-36 px-1 py-2 rounded-3xl text-base text-white hover:bg-blue-900"
      >
        Sign Out
      </button>
    </nav>
  );
}
