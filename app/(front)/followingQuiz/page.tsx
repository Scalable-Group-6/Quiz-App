"use client";
import { useState, useEffect } from "react";

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
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 menit waktu pengerjaan

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
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container mx-auto">
      <div className="bg-[#1F2128] rounded-lg shadow-md w-3/4 mx-auto relative p-6">
        <div className="absolute top-4 right-6 text-white">
          Time Left: {formatTime(timeLeft)}
        </div>
        {!isQuizFinished ? (
          <div className="py-4 my-1 mx-5">
            <h3 className="text-lg font-bold text-white">
              Question {currentQuestionIndex + 1}
            </h3>
            <div className="bg-[#2A2D36] p-4 rounded-lg shadow-md">
              <p className="text-white font-semibold">{currentQuestion.type}</p>
              <p className="text-white">{currentQuestion.question}</p>

              {currentQuestion.type === "Multiple Choice" && (
                <ul className="list-disc pl-5">
                  {currentQuestion.options?.map((option, index) => (
                    <li key={index} className="text-white">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="multipleChoice"
                          value={option.text}
                          onChange={() => handleAnswerChange(option.text)}
                          checked={userAnswers[currentQuestionIndex] === option.text}
                          className="form-radio text-blue-500"
                        />
                        <span className="ml-2">{option.text}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}

              {currentQuestion.type === "True or False" && (
                <div className="space-y-2 flex items-center">
                  <label className="flex items-center mr-4">
                    <input
                      type="radio"
                      name="trueFalse"
                      value="True"
                      onChange={() => handleAnswerChange("True")}
                      checked={userAnswers[currentQuestionIndex] === "True"}
                      className="form-radio text-blue-500 custom-radio"
                    />
                    <span className="ml-2 text-white">True</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="trueFalse"
                      value="False"
                      onChange={() => handleAnswerChange("False")}
                      checked={userAnswers[currentQuestionIndex] === "False"}
                      className="form-radio text-blue-500 custom-radio"
                    />
                    <span className="ml-2 text-white">False</span>
                  </label>
                </div>
              )}

              {currentQuestion.type === "Fill the Blank" && (
                <input
                  className="w-full p-2 rounded border border-gray-300 text-gray-900"
                  type="text"
                  value={userAnswers[currentQuestionIndex] || ""}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  placeholder="Fill the blank"
                />
              )}

              {currentQuestion.type === "Short Answer" && (
                <input
                  className="w-full p-2 rounded border border-gray-300 text-gray-900"
                  type="text"
                  value={userAnswers[currentQuestionIndex] || ""}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  placeholder="Short answer"
                />
              )}

              <div className="flex items-center justify-between mt-4">
                <button
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous Question
                </button>
                <button
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleNextQuestion}
                >
                  {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-4 my-1 mx-5">
            <h3 className="text-lg font-bold text-white">Quiz Results</h3>
            <div className="bg-[#2A2D36] p-4 rounded-lg shadow-md">
              <p className="text-white font-semibold">
                Your Score: {calculateScore()} / {questions.length} ({calculatePercentage()}%)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
