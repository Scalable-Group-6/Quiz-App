"use client";
import { useState } from "react";

interface Quiz {
  id: number;
  title: string;
  description: string;
}

const initialQuizzes: Quiz[] = [
  {
    id: 1,
    title: "Science Quiz",
    description: "A quiz about general science.",
  },
  { id: 2, title: "Math Quiz", description: "A quiz covering basic algebra." },
];

function ManageQuizPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>(initialQuizzes);

  const handleDelete = (id: number) => {
    const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== id);
    setQuizzes(updatedQuizzes);
  };

  const handleEdit = (id: number) => {
    console.log("Editing quiz with ID:", id);
  };

  return (
    <div className="container mx-auto">
      <div className="bg-[#1F2128] rounded-lg shadow-lg w-3/4 mx-auto my-8 p-4">
        <h1 className="text-white text-xl font-bold mb-4">
          Manage Your Quizzes
        </h1>
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-gray-800 p-4 rounded-lg shadow-md mb-4"
          >
            <h2 className="text-white font-bold">{quiz.title}</h2>
            <p className="text-gray-300">{quiz.description}</p>
            <button
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              onClick={() => handleEdit(quiz.id)}
            >
              Edit
            </button>
            <button
              className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => handleDelete(quiz.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageQuizPage;
