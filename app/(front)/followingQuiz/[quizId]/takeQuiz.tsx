"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, SetStateAction } from "react";
import { quiz, question } from "@/lib/models/quizModel";
import { grading } from "@/lib/models/gradingModel";
import axios from "axios";
import { useSession } from "next-auth/react";

const TakeQuizPage = ({ quizId }: { quizId: string }) => {
  const {data:session} = useSession();
  const [quizData, setQuizData] = useState<quiz | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimeLeftFetched, setIsTimeLeftFetched] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_QUIZ_API_URL}/${quizId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data && response.data.questions) {
          console.log(response.data.questions);
          console.log(response.data.duration);
          setQuizData(response.data);
          setQuestions(response.data.questions);
          setSelectedOptions(Array(response.data.questions.length).fill(""));
          setUserAnswers(Array(response.data.questions.length).fill(""));
          setTimeLeft(response.data.duration);
          setIsTimeLeftFetched(true);
        } else {
          console.error("No data returned from the fetch.");
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId]);

  const [questions, setQuestions] = useState<question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (timeLeft === 0 && isTimeLeftFetched) {
      setIsQuizFinished(true);
    }
    if (!isQuizFinished) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, isQuizFinished]);

  const handleAnswerChange = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);

    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = answer;
    setSelectedOptions(newSelectedOptions);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizFinished(true);
    }
    calculateScore();
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let calculatedScore = 0;
    questions.forEach((question, index) => {
      if (question.answer.toLowerCase() === userAnswers[index]?.toLowerCase()) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
  };

  const calculatePercentage = () => {
    return (score / questions.length) * 100;
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setIsQuizFinished(false);
    setTimeLeft(600);
    setSelectedOptions(Array(questions.length).fill(""));
  };

  const currentQuestion = questions[currentQuestionIndex] || {};

  const postGradingData = async () => {
    const createGradingDto = {
      quiz_id: quizId,
      user_id: session?.user?.id, // This should be dynamically set based on the logged-in user
      score: score,
      user_answers: userAnswers,
      correct_answers: questions.map((q) => q.answer), // Assuming each question has an 'answer' property
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_GRADING_API_URL}`,
        createGradingDto,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Grading data posted successfully:", response.data);
    } catch (error) {
      console.error("Error posting grading data:", error);
    }
  };

  useEffect(() => {
    if (isQuizFinished) {
      postGradingData(); // Post grading data when the quiz is finished
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isQuizFinished]);

  return (
    <div className="container mx-auto pb-5">
      <div className="bg-[#1F2128] rounded-lg shadow-md w-3/4 mx-auto relative p-6">
        {!isQuizFinished ? (
          <div className="py-4 my-1 mx-5">
            <div className="flex flex-row justify-between px-1">
              <h3 className="text-lg font-bold text-white mb-2">
                Question {currentQuestionIndex + 1}
              </h3>
              <div className="text-white">
                Time Left: {formatTime(timeLeft)}
              </div>
            </div>
            <div className="bg-[#2A2D36] p-6 rounded-lg shadow-md ">
              <div className="mb-2 border-2 rounded-lg p-2 border-gray-600">
                <p className="text-white  font-bold text-lg">
                  {currentQuestion.type}
                </p>
                <p className="text-white">{currentQuestion.question}</p>
              </div>

              {currentQuestion.type === "Multiple Choice" && (
                <div>
                  {currentQuestion.options?.map((option, index) => (
                    <div
                      className=""
                      key={index}
                      onClick={() => handleAnswerChange(option)}
                    >
                      <div
                        className={` ${
                          selectedOptions[currentQuestionIndex] === option
                            ? "bg-blue-600"
                            : "bg-gray-700"
                        } mb-2 p-2 rounded-lg hover:brightness-75`}
                      >
                        <p>{option}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {currentQuestion.type === "True or False" && (
                <div className="flex flex-row gap-3">
                  {["True", "False"].map(
                    (
                      option,
                      index // Static options for True or False
                    ) => (
                      <button
                        key={index}
                        className={`w-full p-2 text-center rounded-lg cursor-pointer 
                    ${
                      selectedOptions[currentQuestionIndex] === option
                        ? "bg-blue-600"
                        : "bg-gray-700"
                    } 
                    hover:bg-blue-500`}
                        onClick={() => handleAnswerChange(option)}
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>
              )}

              {currentQuestion.type === "Fill the Blank" && (
                <input
                  className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:border-black focus:ring-black focus:outline-gray-600"
                  type="text"
                  value={userAnswers[currentQuestionIndex] || ""}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  placeholder="Fill the blank"
                />
              )}

              {currentQuestion.type === "Short Answer" && (
                <input
                  className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:border-black focus:ring-black focus:outline-gray-600 "
                  type="text"
                  value={userAnswers[currentQuestionIndex] || ""}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  placeholder="Short answer"
                />
              )}

              <div className="flex items-center justify-between mt-4">
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700"
                  type="button"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous Question
                </button>
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700"
                  type="button"
                  onClick={handleNextQuestion}
                >
                  {currentQuestionIndex < questions.length - 1
                    ? "Next Question"
                    : "Finish Quiz"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-4 my-1 mx-5">
            <h1 className="text-2xl font-bold text-white pb-2">Quiz Results</h1>
            <div className="bg-[#2A2D36] p-4 rounded-lg shadow-md">
              <p className="text-white font-semibold">
                Your Score: {score} / {questions.length} (
                {calculatePercentage()}%)
              </p>
            </div>
            <div>
              {questions.map((question, index) => (
                <div key={index} className="pt-2 ">
                  <div className=" bg-[#2A2D36] rounded-lg px-4 py-5">
                    <h3 className="text-lg font-bold text-white mb-2">
                      Question {index + 1}
                    </h3>
                    <h2 className="border-2 rounded-lg p-2 border-gray-600">
                      {question.question}
                    </h2>
                    <div className=" flex flex-row justify-between gap-4">
                      <p
                        className={`w-full rounded-lg p-4 mt-2 ${
                          userAnswers[index]?.toLowerCase() ===
                          question.answer.toLowerCase()
                            ? "bg-green-600"
                            : "bg-red-600"
                        } `}
                      >
                        Your answer : <span>{userAnswers[index]}</span>
                      </p>
                      <p className="bg-blue-600 w-full rounded-lg p-4 mt-2">
                        Correct answer: {question.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 pb-3 flex flex-row justify-between">
              {/* <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                onClick={handleRestartQuiz}
              >
                Restart Quiz
              </button> */}
              <button onClick={() => router.push(`/leaderboard/${quizId}`)}>
                <a className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                  Finish Quiz
                </a>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeQuizPage;
