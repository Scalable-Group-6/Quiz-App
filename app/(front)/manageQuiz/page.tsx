"use client";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const handleDelete = (id: number) => {
    const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== id);
    setQuizzes(updatedQuizzes);
  };

  const handleEdit = (id: number) => {
    console.log("Editing quiz with ID:", id);
  };

  return (
    <div className="container mx-auto">
      <div className="bg-[#1F2128] rounded-lg shadow-lg w-3/4 mx-auto my-8 p-6">
        <h1 className="text-white text-xl font-bold mb-4">
          Manage Your Quizzes
        </h1>
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-[#2A2D36] p-4 rounded-lg shadow-md mb-4"
            >
              <h2 className="text-white font-bold">{quiz.title}</h2>
              <p className="text-gray-300">{quiz.description}</p>
              <div className="mt-2">
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2 hover:bg-blue-700"
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
            </div>
          ))
        ) : (
          <p className="text-gray-300">
            No quizzes available. Please add a new quiz.
          </p>
        )}
        <div className="flex flex-row justify-between mt-4">
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            onClick={() => router.push("/createQuiz")}
          >
            Add New Quiz
          </button>
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            onClick={() => router.push("/")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManageQuizPage;
