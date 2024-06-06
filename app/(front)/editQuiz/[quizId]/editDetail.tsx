"use client";
import { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { question, quiz } from "@/lib/models/quizModel";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { secondToMinuet } from "@/lib/utils";

interface QuizType {
  name: string;
  value: string;
}

const quizzType: QuizType[] = [
  { name: "Multiple Choice", value: "Multiple Choice" },
  { name: "True or False", value: "True Or False" },
  { name: "Short Answer", value: "Short Answer" },
  { name: "Fill the Blank", value: "Fill the Blank" },
];

const EditQuizPage = ({ quizId }: { quizId: string }) => {
  const router = useRouter();

  const [quizData, setQuizData] = useState<quiz | null>(null);
  const [loading, setLoading] = useState(true);

  console.log(quizData);
  console.log(`${process.env.NEXT_PUBLIC_QUIZ_API_URL}/${quizId}`);

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
        console.log(response.data);
        setQuizData(response.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz data: ", error);
      }
    };

    fetchData();
  }, [quizId]);

  const [subjectName, setSubjectName] = useState("");
  const [quizName, setQuizName] = useState("");
  const [duration, setDuration] = useState(0);
  const [questions, setQuestions] = useState<question[]>([]);
  const [dateStart, setDateStart] = useState<Date | null>(null);
  const [dateEnd, setDateEnd] = useState<Date | null>(null);
  const [selectedQuizType, setSelectedQuizType] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [multipleChoiceOptions, setMultipleChoiceOptions] = useState<string[]>([
    "",
    "",
    "",
    "",
  ]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateIndex, setUpdateIndex] = useState<number | null>(null);

  useEffect(() => {
    if (quizData) {
      setSubjectName(quizData.subject);
      setQuizName(quizData.name);
      setDuration(secondToMinuet(quizData.duration));
      setQuestions(quizData.questions);
      setDateStart(quizData.start_time); // Convert the string to a Date object
      setDateEnd(quizData.end_time);
      if (quizData.start_time != null) {
        setDateStart(new Date(quizData.start_time)); // Convert the string to a Date object
        setDateEnd(new Date(quizData.end_time));
        setIsToggled(true);
      }
    }
  }, [quizData]);

  const handleQuizTypeClick = (quizType: string) => {
    setSelectedQuizType(quizType);
    setCurrentQuestion("");
    setCurrentAnswer("");
    if (quizType === "Multiple Choice") {
      setMultipleChoiceOptions(["", "", "", ""]);
    }
    setIsUpdating(false);
  };

  const closeModal = () => {
    setSelectedQuizType("");
  };

  const handleSaveQuestion = () => {
    if (
      !currentQuestion.trim() ||
      (!currentAnswer.trim() && selectedQuizType !== "Multiple Choice")
    ) {
      alert("Please fill out the question and answer.");
      return;
    }

    if (
      selectedQuizType === "Multiple Choice" &&
      multipleChoiceOptions.some((option) => !option.trim())
    ) {
      alert("Please fill out all multiple choice options.");
      return;
    }

    const newQuestion: question = {
      type: selectedQuizType,
      question: currentQuestion,
      answer: currentAnswer,
      options:
        selectedQuizType === "Multiple Choice" ? multipleChoiceOptions : undefined,
    };

    if (isUpdating && updateIndex !== null) {
      const updatedQuestions = [...questions];
      updatedQuestions[updateIndex] = newQuestion;
      setQuestions(updatedQuestions);
    } else {
      setQuestions([...questions, newQuestion]);
    }
    closeModal();
  };

  const handleMultipleChoiceOptionChange = (index: number, value: string) => {
    const newOptions = [...multipleChoiceOptions];
    newOptions[index] = value;
    setMultipleChoiceOptions(newOptions);
  };

  const handleUpdateQuestion = (index: number) => {
    const questionToUpdate = questions[index];
    setSelectedQuizType(questionToUpdate.type);
    setCurrentQuestion(questionToUpdate.question);
    setCurrentAnswer(questionToUpdate.answer);
    if (questionToUpdate.options) {
      setMultipleChoiceOptions(questionToUpdate.options);
    }
    setIsUpdating(true);
    setUpdateIndex(index);
  };

  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, idx) => idx !== index);
    setQuestions(updatedQuestions);
  };

  const handleSaveQuiz = async () => {
    const updatedQuiz = {
      subject: subjectName,
      name: quizName,
      duration: duration * 60,
      questions: questions,
      start_time: dateStart,
      end_time: dateEnd,
    };
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_QUIZ_API_URL}/${quizId}`,
        updatedQuiz,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Quiz updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating quiz:", error);
    }

    router.push(`/`);
  };
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="container mx-auto pb-5">
      <div className="bg-[#1F2128] rounded-lg shadow-md w-3/4 mx-auto p-6">
        {loading ? (
          <div className="p-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="mb-3">
                <SkeletonTheme baseColor="#494A4E" highlightColor="#727272">
                  <Skeleton height={25} width="20%" />
                </SkeletonTheme>
                <div className="mt-2">
                  <SkeletonTheme baseColor="#494A4E" highlightColor="#727272">
                    <Skeleton height={35} width="100%" />
                  </SkeletonTheme>
                </div>
              </div>
            ))}
            <div className="mb-2">
              <SkeletonTheme baseColor="#494A4E" highlightColor="#727272">
                <Skeleton height={25} width="20%" />
              </SkeletonTheme>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonTheme
                  baseColor="#494A4E"
                  highlightColor="#727272"
                  key={index}
                >
                  <Skeleton height={33} width="100%" />
                </SkeletonTheme>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-4 my-1 mx-5 ">
            <span>
              <p className="text-xl font-bold">Edit Quiz</p>
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
              <p className="font-bold text-lg mb-2">Quiz Description</p>
              <input
                className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:border-black focus:ring-black focus:outline-gray-600"
                type="text"
                name="quizName"
                id="quizName"
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
                placeholder="Enter Quiz Description"
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
                {isToggled && (dateStart != null) ? (
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    onChange={handleToggle}
                    checked={isToggled}
                    disabled={true}
                  />
                ) : (
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    onChange={handleToggle}
                    checked={isToggled}
                  />
                )}
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
                    onChange={(e) => setDateStart(new Date(e.target.value))}
                    className="w-full p-2 rounded bg-gray-700"
                  />
                </div>
                <div className="w-full">
                  <p className="font-medium">End</p>
                  <input
                    type="date"
                    name="dateEnd"
                    id="dateEnd"
                    value={
                      dateEnd ? dateEnd.toISOString().substring(0, 10) : ""
                    }
                    onChange={(e) => setDateEnd(new Date(e.target.value))}
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
        )}

        <div className="py-4 my-1 mx-5">
          {loading ? (
            <div className="ml-1">
              <SkeletonTheme baseColor="#494A4E" highlightColor="#727272">
                <Skeleton height={25} width="20%" />
              </SkeletonTheme>
            </div>
          ) : (
            <h3 className="text-lg font-bold">Saved Questions</h3>
          )}
          <div className="grid grid-cols-1 gap-4 mt-2">
            {loading
              ? Array.from({ length: questions.length }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-[#2A2D36] text-white p-4 rounded-lg shadow-md"
                  >
                    <SkeletonTheme baseColor="#494A4E" highlightColor="#727272">
                      <Skeleton height={25} width="50%" />
                      <Skeleton height={20} width="80%" />
                      <Skeleton height={20} width="70%" />
                    </SkeletonTheme>
                  </div>
                ))
              : questions.map((q, index) => (
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
                          <p
                            key={i}
                            className="bg-gray-600 mb-2 p-2 rounded-lg"
                          >
                            {option}
                          </p>
                        ))}
                      </div>
                    )}
                    <p className="text-white-600 italic border-2 rounded-lg p-2 border-gray-600 mt-2 ">
                      Answer : {q.answer}
                    </p>
                    <div className="flex justify-between mt-4">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleDeleteQuestion(index)}
                      >
                        Delete
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleUpdateQuestion(index)}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-x-[600px] p-6">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index}>
                <SkeletonTheme baseColor="#494A4E" highlightColor="#727272">
                  <Skeleton height={35} width="100%" />
                </SkeletonTheme>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-row p-6 my-1 justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSaveQuiz}
            >
              Save Quiz
            </button>
          </div>
        )}
      </div>

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
                    {isUpdating ? "Update Question" : "Save Question"}
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
                    {isUpdating ? "Update Question" : "Save Question"}
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
                    {isUpdating ? "Update Question" : "Save Question"}
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

            {selectedQuizType === "Fill The Blank" && (
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
                    {isUpdating ? "Update Question" : "Save Question"}
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
};

export default EditQuizPage;
