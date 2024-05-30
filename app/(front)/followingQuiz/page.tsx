"use client";
import { useState, useEffect, SetStateAction } from "react";

interface QuizType {
  name: string;
  value: string;
}

interface MultipleChoiceOption {
  text: string;
}

interface Question {
  type: string;
  question: string;
  options?: MultipleChoiceOption[];
  answer: string;
}

export default function TakeQuizPage() {
  const [questions] = useState<Question[]>([
    {
      type: "Multiple Choice",
      question: "rama suka siapa?",
      options: [
        { text: "rehan" },
        { text: "ira" },
        { text: "angie" },
        { text: "macbook" },
      ],
      answer: "ira",
    },
    {
      type: "True or False",
      question: "kiki ganteng?",
      options: [{ text: "True" }, { text: "False" }],
      answer: "False",
    },
    {
      type: "Fill the Blank",
      question: "doni __ kiki",
      answer: "suka",
    },
    {
      type: "Short Answer",
      question: "kata kata yang keluar dari mulut rama adalah?",
      answer: "hmm",
    },
    {
      type: "Multiple Choice",
      question: "apa itu?",
      options: [
        { text: "itu" },
        { text: "apa" },
        { text: "apa itu" },
        { text: "itu apa" },
      ],
      answer: "ira",
    },
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 menit waktu pengerjaan
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    Array(questions.length).fill("")
  );

  useEffect(() => {
    if (timeLeft > 0 && !isQuizFinished) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsQuizFinished(true);
    }
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
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (question.answer.toLowerCase() === userAnswers[index]?.toLowerCase()) {
        score += 1;
      }
    });
    return score;
  };

  const calculatePercentage = () => {
    const score = calculateScore();
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

  const currentQuestion = questions[currentQuestionIndex];

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
                      onClick={() => handleAnswerChange(option.text)}
                    >
                      <div
                        className={` ${
                          selectedOptions[currentQuestionIndex] === option.text
                            ? "bg-blue-600"
                            : "bg-gray-700"
                        } mb-2 p-2 rounded-lg hover:brightness-75`}
                      >
                        <p>{option.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {currentQuestion.type === "True or False" && (
                <div className="flex flex-row gap-3 ">
                  {currentQuestion.options?.map((option, index) => (
                    <div
                      className="w-full"
                      key={index}
                      onClick={() => handleAnswerChange(option.text)}
                    >
                      <div
                        className={`w-full ${
                          selectedOptions[currentQuestionIndex] === option.text
                            ? "bg-blue-600"
                            : "bg-gray-700"
                        } mb-2 p-2 rounded-lg hover:brightness-75`}
                      >
                        <p>{option.text}</p>
                      </div>
                    </div>
                  ))}
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
                Your Score: {calculateScore()} / {questions.length} (
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
                    <h2 className="border-2 rounded-lg p-2 border-gray-600">{question.question}</h2>
                    <div className=" flex flex-row justify-between gap-4">
                      <p className={`w-full rounded-lg p-4 mt-2 ${userAnswers[index]?.toLowerCase()===question.answer.toLowerCase() ? 'bg-green-600' : 'bg-red-600' } `}>
                        Your answer :{" "}
                        <span
                          
                        >
                          {userAnswers[index]}
                        </span>
                      </p>
                      <p className="bg-blue-600 w-full rounded-lg p-4 mt-2">Correct answer: {question.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 pb-3 flex flex-row justify-between">
              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                onClick={handleRestartQuiz}
              >
                Restart Quiz
              </button>
              <button>
                <a
                  href="/"
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                >
                  Finish Quiz
                </a>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
