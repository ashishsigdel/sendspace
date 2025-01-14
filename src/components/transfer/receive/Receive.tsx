"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Session from "./Session";
import TabItem from "@/components/TabIcon";
import { FaArrowRight } from "react-icons/fa";
import toast from "react-hot-toast";
import EnterKey from "./EnterKey";
import { myAxios } from "@/services/apiServices";

export default function Receive() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const key = searchParams.get("key");

  const [linkKey, setLinkKey] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    let key: string | null = null;
    if (linkKey.startsWith("https") || linkKey.startsWith("http")) {
      try {
        const url = new URL(linkKey);
        key = url.searchParams.get("key");
      } catch (error) {
        toast.error("Invalid URL format");
      }
    } else if (linkKey.trim()) {
      key = linkKey;
    }
    if (key) {
      router.push(`/t/receive?key=${key}`);
    } else {
      toast.error("Invalid URL format");
    }
  };

  if (!key) {
    return (
      <EnterKey
        linkKey={linkKey}
        setLinkKey={setLinkKey}
        handleSubmit={handleSubmit}
      />
    );
  }

  return <Session />;
}
