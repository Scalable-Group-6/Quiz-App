"use client";
import { useState } from 'react';

export default function Register( ) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');



  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1F2128]-100">
      <div className="w-full max-w-md p-6 bg-[#1F2128] rounded-3xl shadow-md mt-[-150px]">
        <h2 className="text-2xl font-bold text-center text-white mb-4">Register</h2>
        <form>
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
          <div className="mb-4">
            <label className="block text-white">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 rounded bg-gray-200"
              required
            />
          </div>
          <button type="submit" className="w-full p-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded">Register</button>
        </form>
        <div className="flex justify-center mt-4 text-white">
          <button  className="underline">Back to Login</button>
        </div>
      </div>
    </div>
  );
}
