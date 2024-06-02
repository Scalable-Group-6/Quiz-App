"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface QuizHistory {
  quizName: string;
  score: number;
  date: string;
}

const dummyHistory: QuizHistory[] = [
  { quizName: "Quiz Biologi", score: 85, date: "2024-05-01" },
  { quizName: "Quiz Matematika", score: 90, date: "2024-05-10" },
  { quizName: "Quiz Fisika", score: 75, date: "2024-05-15" },
  { quizName: "Quiz Kimia", score: 80, date: "2024-05-20" },
];

export default function HistoryPage() {
  const [history, setHistory] = useState<QuizHistory[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch history data from backend
    // Example: fetch('/api/history')
    // .then(response => response.json())
    // .then(data => setHistory(data));
    setHistory(dummyHistory); // using dummy data for now
  }, []);

  return (
    <div className="container mx-auto pb-5">
      <div className="bg-[#1F2128] rounded-lg shadow-md w-3/4 mx-auto relative p-6">
        <h1 className="text-2xl font-bold text-white pb-2">Quiz History</h1>
        <div className="bg-[#2A2D36] p-6 rounded-lg shadow-md">
          {history.length === 0 ? (
            <p className="text-white">No history available</p>
          ) : (
            <div>
              <div className="flex flex-row justify-between border-b-[1px] pb-2">
                <p className="mx auto w-full  text-center">Quiz Name</p>
                <p className="mx auto w-full  text-center">Score</p>
                <p className="mx auto w-full  text-center">Date</p>
              </div>
              <div>
                {history.map((quiz, index) => (
                  <div
                    key={index}
                    className="flex flex-row justify-between pt-2 border-b-[1px] pb-2"
                  >
                    <p className="mx auto w-full  text-center">
                      {quiz.quizName}
                    </p>
                    <p className="mx auto w-full  text-center">{quiz.score}</p>
                    <p className="mx auto w-full  text-center">{quiz.date}</p>
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
