"use client";
import { User } from "@/lib/models/UserModel";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Register() {
  const [userData, setUserData] = useState<User[]>([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    e.preventDefault();
    
    // const userData = {
    //   email,
    //   password,
    //   username,
    //   _id: "",
    // } as User;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_QUIZ_API_URL}`,
        JSON.stringify(userData),

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      console.log(response.data);
    } catch (error) {
      console.error("Error registering user: ", error);
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
          <form>
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
              onClick={handleSubmit}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
