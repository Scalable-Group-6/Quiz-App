"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate loading for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto my-auto">
      <div className="bg-[#1F2128] rounded-lg shadow-md w-3/4 mx-auto py-10 my-10">
        {loading ? (
          <SkeletonTheme baseColor="#494A4E" highlightColor="#727272">
            <div className="flex flex-row mx-auto justify-center pb-8">
              <Skeleton height={60} width="70%" />
            </div>
            <div className="w-2/4 mx-auto bg-gray-900 p-6 rounded-lg">
              <div className="text-center">
                <Skeleton height={40} width="60%" />
              </div>
              <div className="mb-4 mt-4">
                <Skeleton height={20} width="100%" />
              </div>
              <Skeleton height={35} width="100%" />
              <div className="mt-3">
                <Skeleton height={20} width="50%" />
              </div>
            </div>
          </SkeletonTheme>
        ) : (
          <>
            <div className="flex flex-row mx-auto justify-center pb-8">
              <p className="text-6xl font-bold">Welcome To Quiz</p>
              <p className="text-3xl pt-[10px] pl-1 text-purple-400">tion</p>
            </div>
            <div className="w-2/4 mx-auto bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-center text-white mb-4">
                Reset Password
              </h2>
              <form>
                <div className="mb-4">
                  <label className="block text-white pb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:border-black focus:ring-black focus:outline-gray-600"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full p-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded"
                >
                  Reset Password
                </button>
              </form>
              <div className="text-white mt-3">
                <button
                  className="underline"
                  onClick={() => {
                    router.push("/signin");
                  }}
                >
                  Back To Login
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
