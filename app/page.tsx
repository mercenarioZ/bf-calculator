"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");

  const onSubmitCheck = () => {
    alert(input);
  };

  return (
    <div className="h-[100vh] bg-zinc-900">
      <nav className="z-20 backdrop-blur-md text-white p-3 fixed w-full border-b bg-zinc-700">
        Badminton Fees Calculator
      </nav>

      <div className="pt-20 text-slate-100 flex items-center justify-center gap-4 px-4">
        Please input your username and a tag
        <div className="flex gap-2 items-center">
          <input
            type="text"
            className="border rounded-lg text-slate-800 p-1 focus:outline-none focus:ring-0"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            type="submit"
            className="border p-1 rounded-lg hover:bg-slate-200 hover:text-zinc-700 transition"
            onClick={onSubmitCheck}
          >
            Check
          </button>
        </div>
      </div>
    </div>
  );
}
