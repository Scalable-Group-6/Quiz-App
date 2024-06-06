"use client";

import { quiz } from "@/lib/models/quizModel";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const quizz = [
  {
    name: "Quiz Biologi",
    creator: "Dhira",
  },
  {
    name: "Quiz Biologi",
    creator: "Dhira",
  },
  {
    name: "Quiz Biologi",
    creator: "Dhira",
  },
  {
    name: "Quiz Biologi",
    creator: "Dhira",
  },
  {
    name: "Quiz Biologi",
    creator: "Dhira",
  },
];

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);


  const [quizData, setQuizData] = useState<quiz[]>([]);
  console.log(quizData);
  const handleTakwQuiz = (id:string) => {
    const quiz = quizData.find((quiz) => quiz._id === id);
    
    if(!quiz){
      console.error("Quiz not found");
    }
    
    router.push(`/followingQuiz/${id}`);
  }

  console.log(quizData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_QUIZ_API_URL}`,{
          headers: {
            "Content-Type": "application/json",
          },
        
        });
        setQuizData(response.data);
        // console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz data: ", error);
      }
    }
    fetchData();
  }, []);


  return (
    <div className=" justify-center">
      <div className="w-3/4 mx-auto ">
        <div className="flex space-x-4">
          <div
            onClick={() => router.push("/createQuiz")}
            className="w-1/2 hover:brightness-90 flex items-center justify-start space-x-2 overflow-hidden p-2 bg-[#1F2128] rounded-3xl shadow-md "
          >
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-12 grow-0 h-12 rounded-2xl flex items-center justify-center">
              <p className="font-light text-2xl">+</p>
            </div>
            <div className="grow ">
              <p className="text-center font-bold ">Create Quiz</p>
            </div>
          </div>
          <div 
          onClick={() => router.push("/manageQuiz")}
          className="w-1/2 hover:brightness-90 flex items-center justify-start space-x-2 p-2 overflow-hidden bg-[#1F2128] rounded-3xl shadow-md ">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-full grow-0 h-full rounded-2xl flex items-center justify-center">
              <p className="font-bold">Manage Quiz</p>
            </div>
          </div>
        </div>
        <div>
          <p className="mt-4 font-semibold text-md">Top Quiz</p>
          <div className="py-2 px-4 bg-black/5 border-white/5 border rounded-3xl mt-4 backdrop-blur-sm">
            {loading ? (
              <div>
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className={`py-2 px-4 mt-2 ${
                      index === quizData.length - 1
                        ? ""
                        : "border-b-2 border-white/5"
                    }`}
                  >
                    <SkeletonTheme baseColor="#494A4E" highlightColor="#727272">
                      <Skeleton height={20} width="50%" />
                      <Skeleton height={15} width="30%" />
                    </SkeletonTheme>
                  </div>
                ))}
              </div>
            ) : (
              quizData.map((quiz, index) => {
                return (
                  <div
                    key={index}
                    className={` flex flex-row justify-between py-2 px-4 mt-2 ${
                      index === quizData.length - 1
                        ? ""
                        : "border-b-2 border-white/5"
                    }`}
                  >
                    <div>
                      <p className="font-semibold">{quiz.name}</p>
                      <p className="font-light">{quiz.creator_id}</p>
                    </div>
                    <div className="my-auto">
                      <button
                        onClick={() => handleTakwQuiz(quiz._id)}
                        className="mb-4 mx-auto bg-blue-500 hover:bg-blue-700 rounded-lg p-3 font-bold"
                      >
                        Take Quiz
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => router.push("/quizList")}
            className="mb-4 mx-auto bg-blue-500 hover:bg-blue-700 rounded-lg p-3 mt-6 font-bold"
          >
            Choose Another Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
