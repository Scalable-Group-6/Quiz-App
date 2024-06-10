"use client";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const {data: session} = useSession();
  console.log("Session:", session);
  const [displayName, setDisplayName] = useState("User Display Name");
  const [password, setPassword] = useState("");
  const [quizCount, setQuizCount] = useState(10); // Example count of quizzes participated
  const [isEditingDisplayName, setIsEditingDisplayName] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate loading for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleDisplayNameChange = () => {
    if (window.confirm("Are you sure you want to change your display name?")) {
      toast.success("Display name changed successfully!");
      // Handle display name change logic here
      setIsEditingDisplayName(false);
    }
  };

  const handlePasswordChange = () => {
    if (window.confirm("Are you sure you want to change your password?")) {
      toast.success("Password changed successfully!");
      // Handle password change logic here
      setIsEditingPassword(false);
    }
  };

  const handleLogout = () => {
    // Handle logout logic here
    toast.info("Logged out successfully!");
  };

  return (
    <div className="lg:grid lg:grid-cols-6 p-4 min-h-screen bg-[#141517] text-white">
      <div className="lg:col-span-4 lg:col-start-2">
        <div className="bg-[#1F2128] p-8 rounded-3xl shadow-md">
          {loading ? (
            <SkeletonTheme baseColor="#494A4E" highlightColor="#727272">
              <Skeleton height={40} width="60%" />
              <div className="mt-6">
                <Skeleton height={20} width="40%" />
                <Skeleton height={35} width="100%" className="mt-2" />
              </div>
              <div className="mt-6">
                <Skeleton height={20} width="40%" />
                <Skeleton height={35} width="100%" className="mt-2" />
              </div>
              <div className="mt-6">
                <Skeleton height={20} width="40%" />
                <Skeleton height={35} width="100%" className="mt-2" />
              </div>
              <Skeleton height={50} width="100%" className="mt-6" />
            </SkeletonTheme>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-6">Profile</h2>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Display Name
                </label>

                <div className="flex space-x-2 items-center">
                  <span>{session?.user?.name}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Quizzes Participated
                </label>
                <p>{quizCount}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 p-2 rounded-md w-full mt-6"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
