"use client";

import { useState, useEffect } from "react";

const initialLeaderboardData = [
  {
    name: "User1",
    score: 95,
  },
  {
    name: "User2",
    score: 90,
  },
  {
    name: "User3",
    score: 85,
  },
  {
    name: "User4",
    score: 80,
  },
  {
    name: "User5",
    score: 75,
  },
  {
    name: "User6",
    score: 70,
  },
  {
    name: "User7",
    score: 65,
  },
  {
    name: "User8",
    score: 60,
  },
  {
    name: "User9",
    score: 55,
  },
  {
    name: "User10",
    score: 50,
  },
];

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState(initialLeaderboardData);

  useEffect(() => {
    setLeaderboardData(initialLeaderboardData);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1F2128]-100">
      <div className="lg:col-span-4 w-full max-w-lg bg-[#1F2128] p-6 rounded-xl shadow-lg ">
        <div className="flex justify-center mb-4">
          <div className="w-full flex items-center justify-center space-x-2 p-2 overflow-hidden bg-[#1F2128] rounded-3xl shadow-md">
            <div className="grow">
              <p className="text-center text-xl font-semibold text-white">Leaderboard</p>
            </div>
          </div>
        </div>
        <div className="py-2 px-4 bg-[#1F2128]-50 border border-gray-200 rounded-3xl mt-4">
          {leaderboardData.map((user, index) => (
            <div
              key={index}
              className={`flex justify-between items-center py-2 px-4 mt-2 ${
                index === leaderboardData.length - 1 ? "" : "border-b-2 border-gray-200"
              }`}
            >
              <p className="font-semibold">{user.name}</p>
              <p className="font-light">{user.score}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
