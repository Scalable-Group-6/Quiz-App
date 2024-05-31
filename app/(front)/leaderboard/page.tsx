"use client";

import { useState, useEffect } from "react";

const initialLeaderboardData = [
  {
    name: "Ramadhani Al-Qadri",
    score: 95,
    avatar: "images/user/default.png",
  },
  {
    name: "User2",
    score: 90,
    avatar: "images/user/default.png",
  },
  {
    name: "User3",
    score: 85,
    avatar: "images/user/default.png",
  },
  {
    name: "User4",
    score: 80,
    avatar: "images/user/default.png",
  },
  {
    name: "User5",
    score: 75,
    avatar: "images/user/default.png",
  },
  {
    name: "User6",
    score: 70,
    avatar: "images/user/default.png",
  },
  {
    name: "User7",
    score: 65,
    avatar: "images/user/default.png",
  },
  {
    name: "User8",
    score: 60,
    avatar: "images/user/default.png",
  },
  {
    name: "User9",
    score: 55,
    avatar: "images/user/default.png",
  },
  {
    name: "User10",
    score: 50,
    avatar: "images/user/default.png",
  },
];

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState(initialLeaderboardData);
  const currentUser = "User3"; // Contoh user yang sedang login

  useEffect(() => {
    setLeaderboardData(initialLeaderboardData);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1F2128]-100">
      <div className="lg:col-span-4 w-full max-w-lg bg-[#1F2128] p-6 rounded-xl shadow-lg ">
        <div className="flex justify-center mb-4">
          <div className="w-full flex items-center justify-center space-x-2 p-2 overflow-hidden bg-[#2A2D36] rounded-3xl shadow-md">
            <div className="grow">
              <p className="text-center text-xl font-semibold text-white">Leaderboard</p>
            </div>
          </div>
        </div>
        <div className="py-2 px-4 bg-[#2A2D36] border border-gray-200 rounded-3xl mt-4">
          {leaderboardData.map((user, index) => (
            <div
              key={index}
              className={`flex justify-between items-center py-2 px-4 mt-2 transition-colors duration-300 bg-[#2A2D36] ${
                index === leaderboardData.length - 1 ? "" : "border-b-2 border-gray-200"
              } ${user.name === currentUser ? "bg-gray-700 rounded-lg" : ""}`}
            >
              <div className="flex items-center">
                <img src={user.avatar} alt={`${user.name}'s avatar`} className="w-8 h-8 rounded-full mr-3" />
                <p className="font-semibold text-white">{user.name}</p>
              </div>
              <p className="font-light text-white">{user.score}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
