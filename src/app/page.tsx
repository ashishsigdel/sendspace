import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="mx-auto flex h-full min-h-[calc(100dvh-96px)] w-full max-w-7xl items-center justify-center px-5">
      <div className="relative -top-[48px] flex h-full w-full flex-col items-center justify-center text-center">
        <h1 className="sm:text6xl text-5xl font-bold text-gray-900 dark:text-gray-200 md:text-7xl">
          Secure, Fast, and Reliable
        </h1>
        <p className="mt-4 max-w-xl text-lg text-gray-600 dark:text-gray-400">
          Share Anything, Anytime. Upload files or paste text, generate a link,
          and send it instantly.
        </p>
        <Link href={"/transfer"}>
          <button className="mt-6 rounded-md bg-blue-600 px-6 py-3 text-lg text-white hover:bg-blue-700">
            Quick Share
          </button>
        </Link>
      </div>
    </div>
  );
}
