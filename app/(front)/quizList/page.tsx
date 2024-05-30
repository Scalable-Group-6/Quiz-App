"use client";
import React from "react";

// Menambahkan data kuis yang lebih banyak
const quizzes = [
  { subject: "Math", name: "Pythagoras 1", creator: "Dhira", duration: 30 },
  { subject: "Math", name: "Pythagoras 2", creator: "Rahul", duration: 45 },
  { subject: "Science", name: "Newton's Laws", creator: "Anita", duration: 40 },
  {
    subject: "Chemistry",
    name: "Organic Compounds",
    creator: "Sari",
    duration: 35,
  },
  { subject: "Math", name: "Calculus Intro", creator: "John", duration: 50 },
  {
    subject: "Physics",
    name: "Electromagnetism",
    creator: "Smith",
    duration: 55,
  },
  { subject: "Biology", name: "Cell Biology", creator: "Dhira", duration: 20 },
  { subject: "Math", name: "Algebra Advanced", creator: "Rahul", duration: 25 },
  {
    subject: "Physics",
    name: "Quantum Mechanics",
    creator: "Anita",
    duration: 60,
  },
  { subject: "History", name: "World War II", creator: "Sari", duration: 45 },
  { subject: "Math", name: "Geometry Basics", creator: "John", duration: 30 },
  { subject: "Science", name: "Human Anatomy", creator: "Smith", duration: 40 },
  { subject: "Art", name: "Renaissance Art", creator: "Dhira", duration: 30 },
  {
    subject: "Science",
    name: "Organic Chemistry",
    creator: "Rahul",
    duration: 35,
  },
  {
    subject: "Literature",
    name: "English Literature",
    creator: "Anita",
    duration: 50,
  },
  { subject: "Math", name: "Statistics", creator: "Sari", duration: 55 },
];

export default function QuizzesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Quiz List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {quizzes.map((quiz, index) => (
          <div
            key={index}
            className="rounded-lg p-6 flex flex-col justify-between h-52 bg-[#1F2128] text-white border border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">{quiz.subject}</h2>
              <p className="text-sm mb-1">{quiz.name}</p>
              <p className="text-sm mb-1">Creator: {quiz.creator}</p>
              <p className="text-sm mb-1">Duration: {quiz.duration} minutes</p>
            </div>
            <button className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
              Take a quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
