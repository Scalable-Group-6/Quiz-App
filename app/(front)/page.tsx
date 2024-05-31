"use client";
import Link from 'next/link';

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
  return (
    <div className="lg:grid lg:grid-cols-6">
      <div className="lg:col-span-4">
        <div className="flex space-x-4">
          <Link href="/createQuiz" className="w-1/2 hover:brightness-90 flex items-center justify-start space-x-2 overflow-hidden p-2 bg-[#1F2128] rounded-3xl shadow-md">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-12 grow-0 h-12 rounded-2xl flex items-center justify-center">
              <p className="font-light text-2xl">+</p>
            </div>
            <div className="grow">
              <p className="text-center">Create Quiz</p>
            </div>
          </Link>
          <Link href="/manageQuiz" className="w-1/2 hover:brightness-90 flex items-center justify-start space-x-2 p-2 overflow-hidden bg-[#1F2128] rounded-3xl shadow-md">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-full grow-0 h-full rounded-2xl flex items-center justify-center">
              <p>Manage Quiz</p>
            </div>
          </Link>
        </div>
        <div>
          <p className="mt-4 font-semibold text-md">Top Quiz</p>
          <div className="py-2 px-4 bg-black/5 border-white/5 border rounded-3xl mt-4 backdrop-blur-sm">
            {quizz.map((quiz, index) => (
              <div
                key={index}
                className={`py-2 px-4 mt-2 ${
                  index === quizz.length - 1 ? "" : "border-b-2 border-white/5"
                }`}
              >
                <p className="font-semibold">{quiz.name}</p>
                <p className="font-light">{quiz.creator}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <Link href="/history" className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded">
            View History
          </Link>
        </div>
      </div>
    </div>
  );
}
