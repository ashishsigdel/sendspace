import TabItem from "@/components/TabIcon";
import React, { useEffect, useState } from "react";
import { FaDownload, FaGlobe, FaKey, FaUser } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
// import { ContentType } from "./dataType";
// import { contentData } from "./data";

interface Props {
  content: any[];
  session: any;
}

export default function PublicSession({ content, session }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <FaUser />
          <p>Shared by anonymous</p>
          <div className="flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 cursor-pointer">
            {session.visibility === "public" ? <FaGlobe /> : <FaKey />}
            {session.visibility}
          </div>
        </div>
        <TabItem
          icon={<FaDownload />}
          label="Download all"
          onClick={() => null}
          active
        />
      </div>
      <div className="mt-10">
        {content.map((file) => (
          <div key={file.id}>
            {/* {file.type === "file" ? (
              <div
                key={file.id}
                className="flex items-center justify-between border-b border-black/10 dark:border-white/10 p-3"
              >
                <p>{file.name}</p>
                <div className="flex gap-4">
                  <p className="text-sm text-yellow-600 dark:text-yellow-300">
                    <span className="hidden sm:inline-block">Size:</span>{" "}
                    {file.size}
                  </p>
                  <p className="text-sm text-yellow-600 dark:text-yellow-300">
                    <span className="hidden sm:inline-block">Expires In:</span>{" "}
                    {file.expiresIn}
                  </p>
                  <button className="text-blue-color">Download</button>
                </div>
              </div>
            ) : ( */}
            <div className="flex justify-between border-b border-black/10 dark:border-white/10 p-3 gap-2">
              <p>Text:</p>
              <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center">
                <div
                  className={`relative w-full rounded-lg border-2 border-gray-300 bg-transparent shadow-sm transition-all duration-200 focus-within:border-blue-500 dark:border-gray-700 dark:focus-within:border-blue-500`}
                >
                  {/* Copy Button */}
                  <button
                    type="button"
                    onClick={() => handleCopy(file.text)}
                    aria-label="Copy to clipboard"
                    className={`absolute right-2 top-2 flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300`}
                  >
                    <MdContentCopy size={14} />
                    {copied ? "Copied!" : "Copy"}
                  </button>

                  <textarea
                    rows={8}
                    value={file.text}
                    onChange={() => null}
                    className={`w-full resize-none rounded-lg border-none bg-transparent p-4 text-gray-800 focus:outline-none dark:text-gray-200 dark:placeholder-gray-500`}
                    placeholder="Write your thoughts here..."
                  />
                </div>
              </div>
            </div>
            {/* )} */}
          </div>
        ))}
      </div>
    </div>
  );
}
