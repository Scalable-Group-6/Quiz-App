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

const quizzType: QuizType[] = [
  { name: "Multiple Choice", value: "multiple" },
  { name: "True or False", value: "truefalse" },
  { name: "Short Answer", value: "short" },
  { name: "Fill the Blank", value: "fillblank" },
];

interface InitialQuiz {
  subjectName: string;
  duration: number;
  description: string;
  questions: Question[];
}

const defaultQuiz: InitialQuiz = {
  subjectName: "Sample Quiz",
  description: "This is a sample quiz.",
  duration: 30,
  questions: [
    {
      type: "Multiple Choice",
      question: "What is the capital of France?",
      options: [
        { text: "Paris" },
        { text: "London" },
        { text: "Berlin" },
        { text: "Madrid" },
      ],
      answer: "Paris",
    },
    {
      type: "True or False",
      question: "The Earth is flat.",
      options: [],
      answer: "False",
    },
    {
      type: "Short Answer",
      question: "Who wrote 'Hamlet'?",
      options: [],
      answer: "William Shakespeare",
    },
    {
      type: "Fill the Blank",
      question: "The chemical symbol for water is __.",
      options: [],
      answer: "H2O",
    },
  ],
};

export default function EditQuizPage({
  initialQuiz = defaultQuiz,
}: {
  initialQuiz?: InitialQuiz;
}) {
  const [subjectName, setSubjectName] = useState(initialQuiz.subjectName);
  const [description, setDescription] = useState(initialQuiz.description);
  const [duration, setDuration] = useState(initialQuiz.duration);
  const [questions, setQuestions] = useState<Question[]>(initialQuiz.questions);
  const [selectedQuizType, setSelectedQuizType] = useState<QuizType | null>(
    null
  );
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [multipleChoiceOptions, setMultipleChoiceOptions] = useState<
    MultipleChoiceOption[]
  >([{ text: "" }, { text: "" }, { text: "" }, { text: "" }]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateIndex, setUpdateIndex] = useState<number | null>(null);

  useEffect(() => {
    if (initialQuiz) {
      setSubjectName(initialQuiz.subjectName || "");
      setDescription(initialQuiz.description || "");
      setDuration(initialQuiz.duration || 0);
      setQuestions(initialQuiz.questions || []);
    }
  }, [initialQuiz]);

  const handleQuizTypeClick = (quizType: QuizType) => {
    setSelectedQuizType(quizType);
    setCurrentQuestion("");
    setCurrentAnswer("");
    setMultipleChoiceOptions([
      { text: "" },
      { text: "" },
      { text: "" },
      { text: "" },
    ]);
    setIsUpdating(false);
  };

  const closeModal = () => {
    setSelectedQuizType(null);
  };

  const handleSaveQuestion = () => {
    if (
      currentQuestion.trim() === "" ||
      (selectedQuizType?.value !== "multiple" && currentAnswer.trim() === "")
    ) {
      alert("Please fill out the question and answer.");
      return;
    }

    if (
      selectedQuizType?.value === "multiple" &&
      multipleChoiceOptions.some((option) => option.text.trim() === "")
    ) {
      alert("Please fill out all multiple choice options.");
      return;
    }

    const newQuestion: Question = {
      type: selectedQuizType?.name ?? "",
      question: currentQuestion,
      answer: currentAnswer,
      options:
        selectedQuizType?.value === "multiple"
          ? multipleChoiceOptions
          : undefined,
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
    newOptions[index].text = value;
    setMultipleChoiceOptions(newOptions);
  };

  const handleDeleteQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleUpdateQuestion = (index: number) => {
    const questionToUpdate = questions[index];
    setSelectedQuizType(
      quizzType.find((q) => q.name === questionToUpdate.type) || null
    );
    setCurrentQuestion(questionToUpdate.question);
    setCurrentAnswer(questionToUpdate.answer);
    setMultipleChoiceOptions(
      questionToUpdate.options || [
        { text: "" },
        { text: "" },
        { text: "" },
        { text: "" },
      ]
    );
    setIsUpdating(true);
    setUpdateIndex(index);
  };

  const handleSaveQuiz = () => {
    const updatedQuiz = {
      subjectName,
      duration,
      questions,
    };
    console.log("Updated Quiz: ", updatedQuiz);
    // Save the updated quiz to the database or handle it accordingly
  };

  return (
    <div className="container mx-auto">
      <div className="bg-[#1F2128] rounded-lg shadow-md w-3/4 mx-auto p-6">
        <div className="py-4 my-1 mx-5">
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
            <p className="font-bold text-lg pb-2">Quiz Desripction</p>
            <input
              className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:border-black focus:ring-black focus:outline-gray-600"
              type="text"
              name="subjectName"
              id="subject"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Subject Name"
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
            <p className="font-bold text-lg">Add New Questions</p>
            <div className="grid grid-cols-2 gap-4">
              {quizzType.map((quiz, index) => (
                <div
                  key={index}
                  className={`py-2 px-4 mt-2 w-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:brightness-90`}
                  onClick={() => handleQuizTypeClick(quiz)}
                >
                  <p className="font-normal">{quiz.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="py-4 my-1 mx-5">
          <h3 className="text-lg font-bold mb-2">Saved Questions</h3>
          <div className="grid grid-cols-1 gap-4">
            {questions.map((q, index) => (
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
                        {option.text}
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

        <div className="flex flex-row py-4 my-1 mx-auto">
          <div className="mx-auto">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSaveQuiz}
            >
              Save Quiz
            </button>
          </div>
        </div>
      </div>

      {/* POP UP UNTUK ISI QUIZ */}

      {selectedQuizType && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg relative w-2/4">
            <h2 className="text-xl font-bold mb-4 text-gray-700">
              {selectedQuizType.name} Question
            </h2>
            <button
              className="absolute top-2 right-2 text-xl font-bold"
              onClick={closeModal}
            >
              &times;
            </button>

            {/* MULTIPLE CHOICE FORM */}

            {selectedQuizType.value === "multiple" && (
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
                        value={option.text}
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

            {/* SHORT ANSWER FORM */}

            {selectedQuizType.value === "short" && (
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
                </div>
              </form>
            )}

            {/* TRUE OR FALSE FORM */}

            {selectedQuizType.value === "truefalse" && (
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
                </div>
              </form>
            )}

            {/* FILL THE BLANK FORM */}

            {selectedQuizType.value === "fillblank" && (
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
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
