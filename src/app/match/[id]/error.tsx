"use client";

import Link from "next/link";

import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function MatchPageError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col gap-5 justify-center items-center h-screen">
      <h2 className="text-3xl">⚠️ Something went wrong!</h2>
      <h3 className="text-2xl">{error.message}</h3>
      <div className="flex flex-row gap-4">
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className="px-4 py-2 bg-orange-500 text-white rounded-md"
        >
          Try again
        </button>
        <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Go back
        </Link>
      </div>
    </div>
  );
}
