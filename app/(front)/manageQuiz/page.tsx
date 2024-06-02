"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate loading for 2 seconds

    return () => clearTimeout(timer);
  }, []);

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
        {loading ? (
          Array.from({ length: 2 }).map((_, index) => (
            <SkeletonTheme baseColor="#494A4E" highlightColor="#727272" key={index}>
              <div className="bg-[#2A2D36] p-4 rounded-lg shadow-md mb-4">
                <Skeleton height={30} width="60%" />
                <Skeleton height={20} width="80%" />
                <div className="mt-2">
                  <Skeleton height={35} width="20%" inline={true} />
                  <Skeleton height={35} width="20%" inline={true} style={{ marginLeft: "10px" }} />
                </div>
              </div>
            </SkeletonTheme>
          ))
        ) : (
          quizzes.length > 0 ? (
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
          )
        )}
        <div className="flex flex-row justify-between mt-4">
          {loading ? (
            <SkeletonTheme baseColor="#494A4E" highlightColor="#727272">
              <Skeleton height={50} width="48%" />
              <Skeleton height={50} width="48%" />
            </SkeletonTheme>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageQuizPage;
