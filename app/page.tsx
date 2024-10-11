"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState<{
    results: string[];
    time: number;
  }>();

  useEffect(() => {
    const fetchData = async () => {
      if (!input) return setSearchResults(undefined);

      const response = await fetch(`/api/search?q=${input}`);
    };

    fetchData();
  }, [input]);

  return (
    <div className="flex flex-col gap-8 h-[100vh] w-full items-center justify-center">
      <input
        className="border border-gray-300 rounded-xl p-1 text-slate-800"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {searchResults ? (
        <div>
          <p>Results: {searchResults.results.join(", ")}</p>
          <p>Time: {searchResults.time}ms</p>
        </div>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}
