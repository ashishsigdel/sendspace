"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Session from "./Session";
import TabItem from "@/components/TabIcon";
import { FaArrowRight } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Receive() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const key = searchParams.get("key");

  const [linkKey, setLinkKey] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRequired, setPasswordRequired] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (linkKey.length > 8 || linkKey.length === 0) {
      toast.error("Invalid key!");
      return;
    }
    if (linkKey === "hello1" && !password) {
      setPasswordRequired(true);
      return;
    }
    setPasswordRequired(false);

    if (linkKey.startsWith("https") || linkKey.startsWith("http")) {
      window.location.href = linkKey;
    } else if (linkKey.trim()) {
      router.push(`/t/receive?key=${encodeURIComponent(linkKey)}`);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setLinkKey(text);
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  if (!key || passwordRequired) {
    return (
      <div className="mx-auto w-full max-w-md mt-10 p-4">
        <h2 className="text-lg font-semibold mb-2">
          Enter a Link or Receiver Key
        </h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={linkKey}
            onChange={(e) => setLinkKey(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-black dark:text-white"
            placeholder="Paste URL or Receiver Key"
          />
          <TabItem
            icon={<></>}
            label="Paste"
            active={true}
            onClick={handlePaste}
          />
        </div>
        {passwordRequired && (
          <div className="flex gap-2 mt-4">
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-black dark:text-white"
              placeholder="Enter Password"
            />
          </div>
        )}

        <div className="mt-7">
          <TabItem
            icon={<FaArrowRight />}
            label="Go"
            active={true}
            onClick={(e: React.FormEvent) => handleSubmit(e)}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <Session />
    </>
  );
}
