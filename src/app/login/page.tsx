"use client";
import axios from "axios";
import { useEffect, useState } from "react";
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

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="">
          <Nav onSignOut={handleSignOut} />
          <AppInterface />
        </div>
      ) : (
        <div>
          <Navbar />
          <div className="flex h-full">
            {/* Left Pane */}
            <div className="hidden lg:flex items-center justify-center flex-1  text-black">
              <div className="max-w-md text-center">
                <Svg />
              </div>
            </div>

            {/* Right Pane */}
            <div className="flex items-center justify-center flex-1 ml-2 mr-2  text-black">
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
                      {isLogin ? "Username or Email" : " Username"}
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
                    className=" bg-blue-400 w-20  text-white px-2 py-2 rounded-md hover:bg-blue-700"
                  >
                    {isLogin ? "Login" : "Sign Up"}
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
