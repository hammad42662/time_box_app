"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Svg from "./svg";
import Nav from "@/components/nav/nav";
import AppInterface from "../appInterface/page";
import Navbar from "@/components/landing/Navbar";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

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
    localStorage.setItem("username", username);
    setIsLoggedIn(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const url = isLogin ? "/api/login" : "/api/signup";
      const loginData = isLogin
        ? { email: email || username, password }
        : { username, email, password };

      const response = await axios.post(url, loginData);

      setSuccess(response.data.message);
      setError(null);

      if (isLogin) {
        const { token } = response.data;
        handleLoginSuccess(token);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "An error occurred");
      setSuccess(null);
    } finally {
      setLoading(false); // End loading
    }
  };

  if (loading) {
    return (
      <div
        role="status"
        className=" flex flex-row justify-center items-center mt-96"
      >
        <svg
          aria-hidden="true"
          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <>
      {isLoggedIn ? (
        <div>
          <Nav onSignOut={handleSignOut} />
          <AppInterface />
        </div>
      ) : (
        <div>
          <Navbar />
          <div className="flex h-full">
            {/* Left Pane */}
            <div className="hidden lg:flex items-center justify-center flex-1 text-black">
              <div className="max-w-md text-center">
                <Svg />
              </div>
            </div>

            {/* Right Pane */}
            <div className="flex items-center justify-center flex-1 ml-2 mr-2 text-black">
              <div className="max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6 text-center">
                  {isLogin ? "Login" : "Sign Up"}
                </h1>
                <form onSubmit={handleSubmit}>
                  {!isLogin && (
                    <div className="mb-4">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="form-input w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  )}
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="username"
                    >
                      {isLogin ? "Username or Email" : "Username"}
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="form-input w-full"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-input w-full"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {error && <div className="text-red-500 mb-4">{error}</div>}
                  {success && (
                    <div className="text-green-500 mb-4">{success}</div>
                  )}
                  <button
                    type="submit"
                    className="bg-blue-400 w-20 text-white px-2 py-2 rounded-md hover:bg-blue-700"
                    disabled={loading} // Disable the button while loading
                  >
                    {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
                  </button>
                </form>
                <div className="mt-4 text-sm">
                  {isLogin ? (
                    <p>
                      Don&apos;t have an account?
                      <span
                        onClick={() => setIsLogin(false)}
                        className="text-blue-500 ml-2 cursor-pointer"
                      >
                        Sign up here
                      </span>
                    </p>
                  ) : (
                    <p>
                      Already have an account?
                      <span
                        onClick={() => setIsLogin(true)}
                        className="text-blue-500 ml-2 cursor-pointer"
                      >
                        Login here
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
