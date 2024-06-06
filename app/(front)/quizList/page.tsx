"use client";
import { quiz } from "@/lib/models/quizModel";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { secondToMinuet } from "@/lib/utils";

export default function QuizzesPage() {
  const [quizData, setQuizData] = useState<quiz[]>([]);
  const router = useRouter();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleTakwQuiz = (id: string) => {
    const quiz = quizData.find((quiz) => quiz._id === id);

    if (!quiz) {
      console.error("Quiz not found");
    }

    router.push(`/followingQuiz/${id}`);
  };

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
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Quiz List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-6">
        {quizData.map((quiz, index) => (
          <div
            key={index}
            className="rounded-lg p-6 flex flex-col justify-between h-54 bg-[#1F2128] text-white border border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">{quiz.subject}</h2>
              <p className="text-sm mb-1">{quiz.name}</p>
              <p className="text-sm mb-1">Creator: {quiz.creator_id}</p>
              <p className="text-sm mb-1">Duration: {secondToMinuet(quiz.duration)} minutes</p>
              <p className="text-sm mb-1">
                Date: {new Date(quiz.start_time).getDate()}{" "}
                {monthNames[new Date(quiz.start_time).getMonth()]} -{" "}
                {new Date(quiz.end_time).getDate()}{" "}
                {monthNames[new Date(quiz.end_time).getMonth()]}
              </p>
            </div>
            <button
              onClick={() => handleTakwQuiz(quiz._id)}
              className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-2 px-4 rounded hover:brightness-75"
            >
              Take a quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
