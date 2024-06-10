"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      console.error(result.error);
    } else {
      // Handle successful login
      router.push("/");
      console.log("Login successful");
    }
  };

  return (
    <div className="container mx-auto my-auto">
      <div className="bg-[#1F2128] rounded-lg shadow-md w-3/4 mx-auto py-10 my-10">
        <div className="flex flex-row mx-auto justify-center pb-8">
          <p className="text-6xl font-bold">Welcome To Quiz</p>
          <p className="text-3xl pt-[10px] pl-1 text-purple-400">tion</p>
        </div>
        <div className="w-2/4 mx-auto bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-center text-white mb-4">
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="pb-1 block text-white">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:border-black focus:ring-black focus:outline-gray-600"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block text-white pb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:border-black focus:ring-black focus:outline-gray-600 "
                required
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded"
            >
              Login
            </button>
          </form>
          <div className="flex justify-between mt-4 text-white">
            <button
              className="underline"
              onClick={() => router.push("/register")}
            >
              Register
            </button>
            <button
              className="underline"
              onClick={() => router.push("/forgot_pass")}
            >
              Forgot Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
