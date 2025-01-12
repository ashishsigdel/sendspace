import React, { useState } from "react";
import { MdContentPaste, MdError } from "react-icons/md";

type Props = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  textError: string | null;
  validateText: any;
};

export default function TextForm({
  text,
  setText,
  textError,
  validateText,
}: Props) {
  const [pasting, setPasting] = useState(false);

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText((prev: string) => prev + clipboardText); // Ensure 'prev' is typed as string
      setPasting(true);
      setTimeout(() => setPasting(false), 1500);
    } catch (error) {
      console.error("Failed to paste", error);
    }
  };
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center">
      <div
        className={`relative w-full rounded-lg border-2 ${
          textError ? "border-red-500" : "border-gray-300 dark:border-gray-700"
        }  bg-transparent shadow-sm transition-all duration-200 focus-within:border-blue-500 dark:focus-within:border-blue-500`}
      >
        {/* Paste Button */}
        <button
          type="button"
          onClick={handlePaste}
          aria-label="Paste from clipboard"
          className={`absolute right-2 top-2 flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 ${
            pasting ? "text-blue-500" : "text-gray-700"
          } `}
        >
          <MdContentPaste size={14} />
          {pasting ? "Pasted!" : "Paste"}
        </button>

        {/* Textarea */}
        <textarea
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={`w-full resize-none rounded-lg border-none bg-transparent p-4 text-gray-800 focus:outline-none dark:text-gray-200 dark:placeholder-gray-500`}
          placeholder="Write your thoughts here..."
          onBlur={validateText}
        />
      </div>
      <div className="w-full flex gap-1 items-center mt-2">
        {textError && (
          <>
            <MdError size={20} color="red" />
            <p className="text-sm text-red-500">{textError}</p>
          </>
        )}
      </div>
    </div>
  );
}
