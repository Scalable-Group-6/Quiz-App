"use client";
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
        <div className="bg-[#2A2D36] p-4 rounded-lg shadow-md">
          {history.length === 0 ? (
            <p className="text-white">No history available</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-800 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Quiz Name</th>
                  <th className="px-6 py-3 bg-gray-800 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 bg-gray-800 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {history.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-white">{item.quizName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">{item.score}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
