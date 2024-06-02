"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { start } from "repl";

const quizData = [
  {
    subject: "Math",
    creator: "Al-Qadri",
    start: "02-06-2024",
    end: "10-06-2024",
    duration: 60,
  },
];

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
  const [leaderboardData, setLeaderboardData] = useState(
    initialLeaderboardData
  );
  const currentUser = "User3"; // Contoh user yang sedang login

  useEffect(() => {
    setLeaderboardData(initialLeaderboardData);
  }, []);

 const router = useRouter();

  return (
    <div className="min-h-screen bg-[#1F2128] w-full max-w-2xl rounded-xl shadow-lg mx-auto mb-6">
      <div className="w-full p-10">
        <div className="flex justify-center mb-4">
          <div className="w-full flex items-center justify-center space-x-2 p-2 overflow-hidden bg-[#2A2D36] rounded-xl shadow-md">
            <div className="grow">
              <p className="text-center text-xl font-semibold text-white">
                Leaderboard
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between gap-52  ">
          <div className=" w-full">
            <span>
              <p className=" border-b-2">Creator : {quizData[0].creator}</p>
              <p className=" border-b-2">Subject : {quizData[0].subject}</p>
              <p className=" border-b-2">Duration : {quizData[0].duration} minutes</p>
            </span>
          </div>
          <div className=" w-full ">
            <span>
              <p className=" border-b-2">Start : {quizData[0].start}</p>
              <p className=" border-b-2">End : {quizData[0].end}</p>
            </span>
          </div>
        </div>
        <div className="py-2 px-4 bg-[#2A2D36] border border-gray-200 rounded-xl mt-4 w-full">
          {leaderboardData.map((user, index) => (
            <div
              key={index}
              className={`flex justify-between items-center py-2 px-4 mt-2 transition-colors duration-300 bg-[#2A2D36] ${
                index === leaderboardData.length - 1
                  ? ""
                  : "border-b-2 border-gray-200"
              } ${user.name === currentUser ? "bg-gray-700 rounded-lg" : ""}`}
            >
              <div className="flex items-center">
                <img
                  src={user.avatar}
                  alt={`${user.name}'s avatar`}
                  className="w-8 h-8 rounded-full mr-3"
                />
                <p className="font-semibold text-white">{user.name}</p>
              </div>
              <p className="font-light text-white px-2">{user.score}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex mx-auto">
        <button 
        onClick={() => router.push("/")}
        className=" mb-4 mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
