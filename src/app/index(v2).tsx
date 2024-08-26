// "use client";
// import { useEffect, useState } from "react";
// import Login from "@/app/login/page";
// import Nav from "@/components/nav/nav";
// import { Provider } from "react-redux";
// import store from "./redux/store";
// import axios from "axios";
// import LandingPage from "@/components/landing/Landing";
// import AppInterface from "./appInterface/page";

// export default function Home() {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(true);
//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const token = localStorage.getItem("authToken");
//         if (token) {
//           const response = await axios.get("/api/protected", {
//             headers: { Authorization: `Bearer ${token}` },
//           });

//           if (response.status === 200) {
//             setIsLoggedIn(true);
//           } else {
//             setIsLoggedIn(false);
//           }
//         } else {
//           setIsLoggedIn(false);
//         }
//       } catch (error) {
//         console.error("Authentication check failed:", error);
//         setIsLoggedIn(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   const handleLoginSuccess = (token: string) => {
//     localStorage.setItem("authToken", token);
//     setIsLoggedIn(true);
//   };

//   const handleSignOut = () => {
//     localStorage.removeItem("authToken");
//     setIsLoggedIn(false);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Provider store={store}>
//       <LandingPage />
//       {isLoggedIn ? (
//         <div className="">
//           <Nav onSignOut={handleSignOut} />
//           <AppInterface />
//         </div>
//       ) : (
//         <Login onLoginSuccess={handleLoginSuccess} />
//       )}
//     </Provider>
//   );
// }

// login
// "use client";

// import axios from "axios";
// import { useState } from "react";
// import NavContent from "../../components/nav/navContent";
// import Svg from "./svg";
// interface LoginProps {
//   onLoginSuccess: (token: string) => void;
// }

// export default function Login({ onLoginSuccess }: LoginProps) {
//   const [isLogin, setIsLogin] = useState(true);
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const url = isLogin ? "/api/login" : "/api/signup";
//       const response = await axios.post(url, { username, email, password });

//       setSuccess(response.data.message);
//       setError(null);

//       if (isLogin) {
//         const { token } = response.data;
//         onLoginSuccess(token);
//       }
//     } catch (err: any) {
//       setError(err.response?.data?.error || "An error occurred");
//       setSuccess(null);
//     }
//   };
//   return (
//     <>
//       <NavContent />
//       <div className="flex h-full">
//         {/* Left Pane */}
//         <div className="hidden lg:flex items-center justify-center flex-1  text-black">
//           <div className="max-w-md text-center">
//             <Svg />
//           </div>
//         </div>

//         {/* Right Pane */}
//         <div className="flex items-center justify-center flex-1  text-black">
//           <div className="max-w-md w-full">
//             <h1 className="text-2xl font-bold mb-6">
//               {isLogin ? "Login" : "Sign Up"}
//             </h1>
//             <form onSubmit={handleSubmit}>
//               {!isLogin && (
//                 <div className="mb-4">
//                   <label
//                     className="block text-sm font-medium mb-1"
//                     htmlFor="username"
//                   >
//                     Username
//                   </label>
//                   <input
//                     type="text"
//                     id="username"
//                     className="form-input w-full"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     required
//                   />
//                 </div>
//               )}
//               <div className="mb-4">
//                 <label
//                   className="block text-sm font-medium mb-1"
//                   htmlFor="email"
//                 >
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   className="form-input w-full"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label
//                   className="block text-sm font-medium mb-1"
//                   htmlFor="password"
//                 >
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   className="form-input w-full"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>
//               {error && <div className="text-red-500 mb-4">{error}</div>}
//               {success && <div className="text-green-500 mb-4">{success}</div>}
//               <button type="submit" className="btn btn-primary w-full">
//                 {isLogin ? "Login" : "Sign Up"}
//               </button>
//             </form>
//             <div className="mt-4 text-sm">
//               {isLogin ? (
//                 <p>
//                   Don&apos;t have an account?{" "}
//                   <span
//                     onClick={() => setIsLogin(false)}
//                     className="text-blue-500 cursor-pointer"
//                   >
//                     Sign up here
//                   </span>
//                 </p>
//               ) : (
//                 <p>
//                   Already have an account?{" "}
//                   <span
//                     onClick={() => setIsLogin(true)}
//                     className="text-blue-500 cursor-pointer"
//                   >
//                     Login here
//                   </span>
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
