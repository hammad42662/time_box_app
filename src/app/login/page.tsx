"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/app/pages/landing/Navbar";
import LoadingState from "./loadingstate";
import LoginContent from "./loginContent";
import Nav from "./dashboard/nav";
import AppInterface from "./dashboard/page";

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
    return <LoadingState />;
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

          <LoginContent
            handleSubmit={handleSubmit}
            isLogin={isLogin}
            email={email}
            setEmail={setEmail}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            error={error}
            success={success}
            loading={loading}
            setIsLogin={setIsLogin}
          />

          {/* Right Pane */}
        </div>
      )}
    </>
  );
}
