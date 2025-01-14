"use client";
import { myAxios } from "@/services/apiServices";
import { handleCopy } from "@/utils/copypaste";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaGlobe, FaGofore, FaKey, FaUser } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import PasswordInput from "./PasswordInput";
import NotFound from "./NotFound";

interface Props {}

export default function Session({}: Props) {
  const searchParams = useSearchParams();

  const key = searchParams.get("key");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<
    | {
        id: number;
        sessionId: string;
        text: string;
      }[]
    | null
  >(null);
  const [session, setSession] = useState<{
    id: number;
    sessionId: string;
    visibility: string;
    createdAt: string;
  } | null>(null);
  const [password, setPassword] = useState("");
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [passwordChecking, setPasswordChecking] = useState(false);

  const fetchContent = async (password?: string) => {
    setLoading(true);
    if (password) {
      setPasswordChecking(true);
    }
    try {
      const response = await myAxios.post(`/receive/${key}`, {
        password: password,
      });
      setSession(response.data.data.session);
      if (response.data.data.content.status === "ok") {
        setContent(response.data.data.content.data);
        setPasswordRequired(false);
      } else {
        if (response.data.data.content.status === "Invalid password.") {
          toast.error(response.data.data.content.status);
        }
        setPasswordRequired(true);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
      setPasswordChecking(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [key]);

  if (!passwordChecking && loading && !session) {
    return (
      <div className="animate-pulse">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-20 mt-12">
          <div className="h-8 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-72 w-full bg-gray-300 dark:bg-gray-700 rounded mx-auto"></div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-20 mt-4">
          <div className="h-8 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-32 w-full bg-gray-300 dark:bg-gray-700 rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!loading && !session) {
    return <NotFound />;
  }

  return (
    <div>
      {session && (
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <FaUser />
            <p>Shared by anonymous</p>
            <div className="flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 cursor-pointer">
              {session.visibility === "public" ? <FaGlobe /> : <FaKey />}
              {session.visibility}
            </div>
          </div>
        </div>
      )}
      {passwordRequired && (
        <PasswordInput
          password={password}
          setPassword={setPassword}
          fetchContent={fetchContent}
          passwordChecking={passwordChecking}
        />
      )}
      <div className="mt-10">
        {content &&
          content.map((file) => (
            <div
              key={file.id}
              className="flex flex-col sm:flex-row justify-between border-b border-black/10 dark:border-white/10 p-3 gap-2"
            >
              <p>Text:</p>
              <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center">
                <div className="relative w-full rounded-lg border-2 border-gray-300 bg-transparent shadow-sm">
                  <button
                    type="button"
                    onClick={() => handleCopy(file.text, setCopied)}
                    aria-label="Copy to clipboard"
                    className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                  >
                    <MdContentCopy size={14} />
                    {copied ? "Copied!" : "Copy"}
                  </button>

                  <textarea
                    rows={Math.min(
                      Math.max(file.text.split("\n").length + 2, 8),
                      20
                    )}
                    value={file.text}
                    onChange={() => null}
                    className="w-full resize-none rounded-lg border-none bg-transparent p-4 text-gray-800 dark:text-gray-200"
                    placeholder="Content here..."
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
