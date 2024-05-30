"use client";
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1F2128]">
     <div className="w-full max-w-md p-6 bg-gray-900 rounded-3xl shadow-md mt-[-150px]">
        <h2 className="text-2xl font-bold text-center text-white mb-4">Login</h2>
        <form >
          <div className="mb-4">
            <label className="block text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-gray-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-gray-200"
              required
            />
          </div>
          <button type="submit" className="w-full p-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded">Login</button>
        </form>
        <div className="flex justify-between mt-4 text-white">
          <button  className="underline">Register</button>
          <button  className="underline">Forgot Password</button>
        </div>
      </div>
    </div>
  );
}
