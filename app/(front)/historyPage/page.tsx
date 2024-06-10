"use client";
import { grading } from "@/lib/models/gradingModel";
import { quiz } from "@/lib/models/quizModel";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function HistoryPage() {
  const [gradeByQuiz, setGradeByQuiz] = useState<grading[]>([]);
  console.log(gradeByQuiz);
  const { data: session } = useSession();
  console.log(session);

  const [quizData, setQuizData] = useState<quiz[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_QUIZ_API_URL}`,
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
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_GRADING_API_URL}/user/${session?.user?.id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setGradeByQuiz(response.data);
      } catch (error) {
        console.error("Error fetching quiz data: ", error);
      }
    }
    fetchData();
  }, [session?.user]);

  const router = useRouter();

  return (
    <div className="container mx-auto pb-5">
      <div className="bg-[#1F2128] rounded-lg shadow-md w-3/4 mx-auto relative p-6">
        <h1 className="text-2xl font-bold text-white pb-2">Quiz History</h1>
        <div className="bg-[#2A2D36] p-6 rounded-lg shadow-md">
          {gradeByQuiz.length === 0 ? (
            <p className="text-white">No history available</p>
          ) : (
            <div>
              <div className="flex flex-row justify-between border-b-[1px] pb-2">
                <p className="mx auto w-full  text-center">Quiz Name</p>
                <p className="mx auto w-full  text-center">Score</p>
                <p className="mx auto w-full  text-center"></p>
              </div>
              <div>
                {gradeByQuiz.map((quiz, index) => (
                  <div
                    key={index}
                    className="flex flex-row justify-between pt-2 border-b-[1px] pb-2"
                  >
                    <p className="mx auto w-full  text-center">
                      {quizData.find((q) => q._id === quiz.quiz_id)?.name}
                    </p>
                    <p className="mx auto w-full  text-center">{quiz.score}</p>
                    <button
                      className="mx auto w-[70%]  text-center bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg "
                      onClick={() => {
                        router.push(`/leaderboard/${quiz.quiz_id}`);
                      }}
                    >
                      Lihat
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() => router.push("/")}
            className="bg-[#3B82F6] text-white rounded-lg p-2 mt-4 w-full hover:bg-blue-600 font-bold"
          >
            Back to dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
