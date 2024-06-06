"use client";
import { useRouter } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";
// import Skeleton from "react-loading-skeleton"; // Import skeleton loader if using a library
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { question, quiz } from "@/lib/models/quizModel";
import axios from "axios";

interface QuizType {
  name: string;
  value: string;
}

const quizzType: QuizType[] = [
  {
    name: "Multiple Choice",
    value: "Multiple Choice",
  },
  {
    name: "True or False",
    value: "True or False",
  },
  {
    name: "Short Answer",
    value: "Short Answer",
  },
  {
    name: "Fill the Blank",
    value: "Fill the Blank",
  },
];

export default function createQuizPage() {
  const [questionsData, setQuestionsData] = useState<question[]>([]);

  const router = useRouter();
  const [selectedQuizType, setSelectedQuizType] = useState("");

  const [subjectName, setSubjectName] = useState("");
  const [quizName, setQuizName] = useState("");
  const [duration, setDuration] = useState(0); // You might want to get this from an input field
  // const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [multipleChoiceOptions, setMultipleChoiceOptions] = useState<string[]>([
    "",
    "",
    "",
    "",
  ]);

  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const [dateStart, setDateStart] = useState<Date | null>(null);
  const [dateEnd, setDateEnd] = useState<Date | null>(null);

  const handleQuizTypeClick = (quizType: string) => {
    setSelectedQuizType(quizType);
    setCurrentQuestion("");
    setCurrentAnswer("");
    setMultipleChoiceOptions(["", "", "", ""]);
  };

  const closeModal = () => {
    setSelectedQuizType("");
  };

  const handleSaveQuestion = () => {
    if (
      currentQuestion.trim() === "" ||
      (selectedQuizType === "Multiple Choice" && currentAnswer.trim() === "")
    ) {
      alert("Please fill out the question and answer.");
      return;
    }

    if (
      selectedQuizType === "Multiple Choice" &&
      multipleChoiceOptions.some((option) => option.trim() === "")
    ) {
      alert("Please fill out all multiple choice options.");
      return;
    }

    if (selectedQuizType === "Multiple Choice") {
      let newQuestion = {
        type: "Multiple Choice",
        question: currentQuestion,
        options: multipleChoiceOptions,
        answer: currentAnswer,
      } as question;

      newQuestion.options = multipleChoiceOptions;
      setQuestionsData([...questionsData, newQuestion]);
    } else {
      let newQuestion = {
        type: selectedQuizType,
        question: currentQuestion,
        answer: currentAnswer,
      } as question;

      setQuestionsData([...questionsData, newQuestion]);
    }
    closeModal();
  };

  const handleMultipleChoiceOptionChange = (index: number, value: string) => {
    const newOptions = [...multipleChoiceOptions];
    newOptions[index] = value;
    setMultipleChoiceOptions(newOptions);
  };

  const handleSaveQuiz = async () => {
    if (questionsData.length === 0) {
      alert("Please add at least one question to save the quiz.");
      return;
    }


    const quizData = {
      // _id: "", 
      subject: subjectName,
      duration: duration * 60,
      questions: questionsData,
      start_time: dateStart,
      end_time: dateEnd,
      name: quizName,
      creator_id: "w4ertuyitfrdg",
    } as quiz;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_GRADING_API_URL}`,
        JSON.stringify(quizData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Quiz submitted successfully:", response.data);
      // Handle the response as needed
    } catch (error) {
      console.error("Error submitting quiz data:", error);
    }
    console.log(quizData);
    setQuestionsData([]);
  };

  return (
    <div className="container mx-auto pb-5">
      <div className="bg-[#1F2128] rounded-lg shadow-md w-3/4 mx-auto p-6">
        <div className="py-4 my-1 mx-5 ">
          <span>
            <p className="text-xl font-bold">Create A New Quiz</p>
          </span>
          <div className="mt-2">
            <input
              className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:border-black focus:ring-black focus:outline-gray-600"
              type="text"
              name="subjectName"
              id="subject"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="Enter Subject Name"
            />
          </div>
          <div className="mt-2">
            <p className="font-bold text-lg mb-2">Quiz Name</p>
            <input
              className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:border-black focus:ring-black focus:outline-gray-600"
              type="text"
              name="quizName"
              id="quizName"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              placeholder="Enter Quiz Name"
            />
          </div>
          <div className="mt-2">
            <p className="font-bold text-lg">Duration (in minutes)</p>
            <input
              className="mt-2 w-full p-2 rounded bg-gray-700 focus:outline-none focus:border-black focus:ring-black focus:outline-gray-600"
              type="number"
              value={duration}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 0) {
                  setDuration(value);
                } else {
                  setDuration(0);
                }
              }}
              min="0"
              placeholder="Enter Duration"
            />
          </div>
          <div className="mt-4">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onChange={handleToggle}
                checked={isToggled}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-lg font-medium text-gray-900 dark:text-gray-300">
                Add Deadline
              </span>
            </label>
          </div>
          <div
            className={`mt-2 overflow-hidden transition-all duration-500 ease-in-out ${
              isToggled ? "max-h-[100px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-row justify-between gap-4">
              <div className="w-full">
                <p className="font-medium">Start</p>
                <input
                  type="date"
                  name="dateStart"
                  id="dateStart"
                  value={
                    dateStart ? dateStart.toISOString().substring(0, 10) : ""
                  }
                  onChange={(e) =>
                    setDateStart(
                      e.target.value ? new Date(e.target.value) : null
                    )
                  }
                  className="w-full p-2 rounded bg-gray-700"
                />
              </div>
              <div className="w-full">
                <p className="font-medium">End</p>
                <input
                  type="date"
                  name="dateEnd"
                  id="dateEnd"
                  value={dateEnd ? dateEnd.toISOString().substring(0, 10) : ""}
                  onChange={(e) =>
                    setDateEnd(e.target.value ? new Date(e.target.value) : null)
                  }
                  className="w-full p-2 rounded bg-gray-700"
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="font-bold text-lg">Add New Questions</p>
            <div className="grid grid-cols-2 gap-4">
              {quizzType.map((quiz, index) => {
                return (
                  <div
                    key={index}
                    className={` py-2 px-4  mt-2 w-full ${
                      index === quizzType.length
                        ? ""
                        : "bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:brightness-90"
                    }`}
                    onClick={() => handleQuizTypeClick(quiz.value)}
                  >
                    <p className="font-normal ">{quiz.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* BATAS AKHIR SKELETON  */}

        <div className="py-4 my-1 mx-5">
          <h3 className="text-lg font-bold">Saved Questions</h3>

          <div className="grid grid-cols-1 gap-4 mt-2">
            {questionsData.map((q, index) => (
              <div
                key={index}
                className="bg-[#2A2D36] text-white p-4 rounded-lg shadow-md"
              >
                <p className="text-white-700 font-bold text-xl">{q.type}</p>
                <p className="text-white-900 border-2 rounded-lg p-2 border-gray-600 mt-2">
                  {q.question}
                </p>
                {q.type === "Multiple Choice" && (
                  <div className="mt-2">
                    {q.options?.map((option, i) => (
                      <p key={i} className="bg-gray-600 mb-2 p-2 rounded-lg">
                        {option}
                      </p>
                    ))}
                  </div>
                )}
                <p className="text-white-600 italic border-2 rounded-lg p-2 border-gray-600 mt-2 ">
                  Answer : {q.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-row p-6 my-1 justify-between">
          <button
            onClick={() => router.push("/")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Back to Dashboard
          </button>
          <button
            onClick={handleSaveQuiz}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Quiz
          </button>
        </div>
      </div>

      {/* POP UP UNTUK ISI QUIZ */}

      {selectedQuizType && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg relative w-2/4">
            <h2 className="text-xl font-bold mb-4 text-gray-700">
              {selectedQuizType} Question
            </h2>
            <button
              className="absolute top-2 right-2 text-xl font-bold"
              onClick={closeModal}
            >
              &times;
            </button>

            {/* MULTIPLE CHOICE FORM */}

            {selectedQuizType === "Multiple Choice" && (
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Question:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    value={currentQuestion}
                    onChange={(e) => setCurrentQuestion(e.target.value)}
                    placeholder="Enter your question"
                  />
                </div>
                <div className="mb-4">
                  {multipleChoiceOptions.map((option, index) => (
                    <div key={index} className="mb-2">
                      <label className="block text-gray-700 text-sm font-bold mb-1">
                        Option {index + 1}:
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleMultipleChoiceOptionChange(
                            index,
                            e.target.value
                          )
                        }
                        placeholder={`Option ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Correct Answer:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    placeholder="Enter the correct answer"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleSaveQuestion}
                  >
                    Save Question
                  </button>
                  <button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </button>
                </div>
              </form>
            )}

            {/* SHORT ANSWER FORM */}

            {selectedQuizType === "Short Answer" && (
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Question:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    value={currentQuestion}
                    onChange={(e) => setCurrentQuestion(e.target.value)}
                    placeholder="Enter your question"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Correct Answer:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    placeholder="Enter the correct answer"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleSaveQuestion}
                  >
                    Save Question
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* TRUE OR FALSE FORM */}

            {selectedQuizType === "True or False" && (
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Question:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    value={currentQuestion}
                    onChange={(e) => setCurrentQuestion(e.target.value)}
                    placeholder="Enter your question"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Correct Answer:
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                  >
                    <option value="">Select correct answer</option>
                    <option value="True">True</option>
                    <option value="False">False</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleSaveQuestion}
                  >
                    Save Question
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* FILL THE BLANK FORM */}

            {selectedQuizType === "Fill the Blank" && (
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Question (use __ for the blank):
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={currentQuestion}
                    onChange={(e) => setCurrentQuestion(e.target.value)}
                    placeholder="Enter your question with blanks, e.g., The capital of France is __."
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Correct Answer:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    placeholder="Enter the correct answer for the blank"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleSaveQuestion}
                  >
                    Save Question
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
