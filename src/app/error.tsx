"use client";

import { useEffect } from "react";
import Link from "next/link";

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
    <div className="flex flex-col items-center justify-center gap-5 p-32">
      <h2 className="text-3xl">⚠️ Something went wrong!</h2>
      {/* <h3 className="text-2xl">{error.message}</h3> */}
      <div className="flex flex-row gap-4">
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className="rounded-md bg-primary px-4 py-2 text-white"
        >
          Try again
        </button>
        <Link href="/" className="rounded-md bg-blue-500 px-4 py-2 text-white">
          Go back
        </Link>
      </div>
    </div>
  );
}
