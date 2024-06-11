"use client";
import { User } from "@/lib/models/UserModel";
import { useState, useEffect } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [userData, setUserData] = useState<User[]>([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const json = JSON.stringify({
      username,
      email,
      password,
    });

    console.log("Request JSON:", json);
    console.log("API URL:", `${process.env.NEXT_PUBLIC_AUTH_API_URL}/users`);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: json,
        credentials: 'include'
      });

      console.log("Raw Response:", response);

      if (response.ok) {
        router.push("/signin");
        // const errorData = await response.json();
        // console.error("Error Response Data:", errorData);
        // throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response Data:", data);

      // Uncomment if you want to sign in the user after registration
      // if (data) {
      //   await signIn("credentials", {
      //     email,
      //     password,
      //     redirect: true,
      //     callbackUrl: "/",
      //   });
      // }
    } catch (error:any) {
      console.error("Error registering user: ", error.message);
      // setError("Error registering user: " + error.message);
    }
  };

  return (
    <div className="container mx-auto my-auto">
      <div className="bg-[#1F2128] rounded-lg shadow-md w-3/4 mx-auto py-10 my-4">
        <div className="flex flex-row mx-auto justify-center pb-8">
          <p className="text-6xl font-bold">Welcome To Quiz</p>
          <p className="text-3xl pt-[10px] pl-1 text-purple-400">tion</p>
        </div>
        <div className="w-2/4 mx-auto bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-center text-white mb-4">
            Register
          </h2>
          <form
           onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <label className="block text-white pb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:border-black focus:ring-black focus:outline-gray-600"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-white pb-1">Username</label>
              <input
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:border-black focus:ring-black focus:outline-gray-600"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-white pb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:border-black focus:ring-black focus:outline-gray-600"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block text-white pb-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:border-black focus:ring-black focus:outline-gray-600"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
