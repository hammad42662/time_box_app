"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import NavContent from "./navContent";
interface NavProps {
  onSignOut: () => void;
}

export default function Nav({ onSignOut }: NavProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await axios.post("/api/signout");
      onSignOut(); // Notify parent component about sign-out
      router.push("/"); // Redirect to login page
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <nav className="w-full h-full bg-white mt-4 flex flex-row justify-center items-center">
      <NavContent />
      <div className="self-end">
        <button
          onClick={handleSignOut}
          className="ml-4 bg-blue-700 px-2 py rounded-lg text-lg text-white hover:bg-blue-200"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}
