"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { question, quiz } from "@/lib/models/quizModel";
import axios from "axios";

interface Quiz {
  id: number;
  title: string;
  description: string;
}

function ManageQuizPage() {
  const [quizData, setQuizData] = useState<quiz[]>([]);
  const [currentQuizId, setCurrentQuizId] = useState<string>("");
  const [currentName, setCurrentName] = useState<string>("");
  const [currentSubject, setCurrentSubject] = useState<string>("");
  const [currentDuration, setCurrentDuration] = useState<number>(0);
  

  console.log(quizData);
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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz data: ", error);
      }
    };
    fetchData();
  }, []);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_QUIZ_API_URL}/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedQuizzes = quizData.filter((quizItem) => quizItem._id !== id);
      setQuizData(updatedQuizzes);
      console.log("Quiz deleted successfully");
    } catch (error) {
      console.error("Error deleting quiz:", error);
      alert("Failed to delete the quiz.");
    }
  };

  const handleEdit = (id: string) => {
    console.log("Editing quiz with ID:", id);

    const quizToEdit = quizData.find(quiz => quiz._id === id);

    if (!quizToEdit) {
        console.error("Quiz not found!");
        alert("Quiz not found!");
        return;
    }

    // Setting the current quiz data into state (if needed for further operations)
    setCurrentQuizId(quizToEdit._id);
    setCurrentName(quizToEdit.name);
    setCurrentSubject(quizToEdit.subject);
    setCurrentDuration(quizToEdit.duration);

    // Navigate to the edit page for this specific quiz
    router.push(`/editQuiz/${id}`);
};



  return (
    <div className="container mx-auto">
      <div className="bg-[#1F2128] rounded-lg shadow-lg w-3/4 mx-auto my-8 p-6">
        <h1 className="text-white text-xl font-bold mb-4">
          Manage Your Quizzes
        </h1>
        {loading ? (
          Array.from({ length: 2 }).map((_, index) => (
            <SkeletonTheme
              baseColor="#494A4E"
              highlightColor="#727272"
              key={index}
            >
              <div className="bg-[#2A2D36] p-4 rounded-lg shadow-md mb-4">
                <Skeleton height={30} width="60%" />
                <Skeleton height={20} width="80%" />
                <div className="mt-2">
                  <Skeleton height={35} width="20%" inline={true} />
                  <Skeleton
                    height={35}
                    width="20%"
                    inline={true}
                    style={{ marginLeft: "10px" }}
                  />
                </div>
              </div>
            </SkeletonTheme>
          ))
        ) : quizData.length > 0 ? (
          quizData.map((quiz) => (
            <div
              key={quiz._id}
              className="bg-[#2A2D36] p-4 rounded-lg shadow-md mb-4"
            >
              <h2 className="text-white font-bold">{quiz.subject}</h2>
              <p className="text-gray-300">{quiz.name}</p>
              <div className="mt-2">
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2 hover:bg-blue-700"
                  onClick={() => handleEdit(quiz._id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleDelete(quiz._id)}
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
