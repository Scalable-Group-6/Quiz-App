"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { start } from "repl";
import { grading } from "@/lib/models/gradingModel";
import axios from "axios";
import Image from "next/image";
import { quiz } from "@/lib/models/quizModel";
import { User } from "@/lib/models/UserModel";

const Leaderboard = ({ quizId }: { quizId: string }) => {
  const [gradingData, setGradingData] = useState<grading[]>([]);
  const [quizData, setQuizData] = useState<quiz>({} as quiz);
  const [usersData, setUsersData] = useState<User[]>([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_AUTH_API_URL}/users`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setUsersData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching quiz data: ", error);
      }
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_QUIZ_API_URL}/${quizId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setQuizData(response.data);

        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching quiz data: ", error);
      }
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_GRADING_API_URL}/quiz/${quizId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setGradingData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching quiz data: ", error);
      }
    };
    fetchData();
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const [leaderboardData, setLeaderboardData] = useState(
  //   initialLeaderboardData
  // );
  const currentUser = "User3"; // Contoh user yang sedang login

  useEffect(() => {
    setGradingData((prevData) => {
      const sortedData = [...prevData].sort((a, b) => b.score - a.score);
      return sortedData;
    });
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
              <p className="border-b-2">
                Creator :{" "}
                {usersData
                  ? usersData.find((user) => user._id === quizData?.creator_id)
                      ?.username
                  : "Creator"}
              </p>

              <p className=" border-b-2">Subject : {quizData?.subject}</p>
              <p className=" border-b-2">
                Duration : {quizData?.duration / 60} minutes
              </p>
            </span>
          </div>
          <div className=" w-full ">
            <span>
              <p className=" border-b-2">
                Start : {quizData?.start_time as unknown as string | "-"}
              </p>
              <p className=" border-b-2">
                End : {quizData?.end_time as unknown as string | "-"}
              </p>
            </span>
          </div>
        </div>
        <div className="py-2 px-4 bg-[#2A2D36] border border-gray-200 rounded-xl mt-4 w-full">
          {gradingData.map((user, index) => (
            <div
              key={index}
              className={`flex justify-between items-center py-2 px-4 mt-2 transition-colors duration-300 bg-[#2A2D36] ${
                index === gradingData.length - 1
                  ? ""
                  : "border-b-2 border-gray-200"
              } ${
                user.user_id === currentUser ? "bg-gray-700 rounded-lg" : ""
              }`}
            >
              <div className="flex items-center relative">
                <Image
                  src={"/images/user/default.png"}
                  alt={`${user.user_id}'s avatar`}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full relative mr-3"
                />
                <p className="font-semibold text-white">
                  {usersData
                    ? usersData.find((userd) => userd._id === user.user_id)
                        ?.username
                    : "user"}
                </p>
              </div>
              <p className="font-light text-white px-2">{user.score}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex mx-auto">
        <button
          onClick={() => router.push("/")}
          className=" mb-4 mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};
export default Leaderboard;
