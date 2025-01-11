"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PublicSession from "./PublicSession";
import TabItem from "@/components/TabIcon";
import { FaArrowRight } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Receive() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const key = searchParams.get("key");

  const [linkKey, setLinkKey] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    if (linkKey.length > 8 || linkKey.length === 0) {
      toast.error("Invalid key!");
      return;
    }
    e.preventDefault();
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

  if (!key) {
    return (
      <div className="mx-auto w-full max-w-md mt-10 p-4">
        <h2 className="text-lg font-semibold mb-2">
          Enter a Link or Receiver Key
        </h2>
        <div className="flex gap-2 mb-7">
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
        <TabItem
          icon={<FaArrowRight />}
          label="Go"
          active={true}
          onClick={(e: React.FormEvent) => handleSubmit(e)}
        />
      </div>
    );
  }

  return (
    <>
      <PublicSession />
    </>
  );
}
