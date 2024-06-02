"use client";
import React from "react";

// Menambahkan data kuis yang lebih banyak
const quizzes = [
  { subject: "Math", name: "Pythagoras 1", creator: "Dhira", duration: 30, date: "2023-01-01" },
  { subject: "Math", name: "Pythagoras 2", creator: "Rahul", duration: 45, date: "2023-02-01" },
  { subject: "Science", name: "Newton's Laws", creator: "Anita", duration: 40, date: "2023-03-01" },
  {
    subject: "Chemistry",
    name: "Organic Compounds",
    creator: "Sari",
    duration: 35,
    date: "2023-04-01",
  },
  { subject: "Math", name: "Calculus Intro", creator: "John", duration: 50, date: "2023-05-01" },
  {
    subject: "Physics",
    name: "Electromagnetism",
    creator: "Smith",
    duration: 55,
    date: "2023-06-01",
  },
  { subject: "Biology", name: "Cell Biology", creator: "Dhira", duration: 20, date: "2023-07-01" },
  { subject: "Math", name: "Algebra Advanced", creator: "Rahul", duration: 25, date: "2023-08-01" },
  {
    subject: "Physics",
    name: "Quantum Mechanics",
    creator: "Anita",
    duration: 60,
    date: "2023-09-01",
  },
  { subject: "History", name: "World War II", creator: "Sari", duration: 45, date: "2023-10-01" },
  { subject: "Math", name: "Geometry Basics", creator: "John", duration: 30, date: "2023-11-01" },
  { subject: "Science", name: "Human Anatomy", creator: "Smith", duration: 40, date: "2023-12-01" },
  { subject: "Art", name: "Renaissance Art", creator: "Dhira", duration: 30, date: "2024-01-01" },
  {
    subject: "Science",
    name: "Organic Chemistry",
    creator: "Rahul",
    duration: 35,
    date: "2024-02-01",
  },
  {
    subject: "Literature",
    name: "English Literature",
    creator: "Anita",
    duration: 50,
    date: "2024-03-01",
  },
  { subject: "Math", name: "Statistics", creator: "Sari", duration: 55, date: "2024-04-01" },
];

export default function QuizzesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Quiz List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-6">
        {quizzes.map((quiz, index) => (
          <div
            key={index}
            className="rounded-lg p-6 flex flex-col justify-between h-54 bg-[#1F2128] text-white border border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">{quiz.subject}</h2>
              <p className="text-sm mb-1">{quiz.name}</p>
              <p className="text-sm mb-1">Creator: {quiz.creator}</p>
              <p className="text-sm mb-1">Duration: {quiz.duration} minutes</p>
              <p className="text-sm mb-1">Date: {quiz.date}</p>
            </div>
            <button className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-2 px-4 rounded hover:brightness-75">
              Take a quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
