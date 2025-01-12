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
  const [password, setPassword] = useState("");
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [session, setSession] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    let key: string | null = null;
    if (linkKey.startsWith("https") || linkKey.startsWith("http")) {
      try {
        const url = new URL(linkKey);
        key = url.searchParams.get("key");
      } catch (error) {
        console.error("Invalid URL format");
      }
    } else if (linkKey.trim()) {
      key = linkKey;
    }
    if (key) {
      router.push(`/t/receive?key=${key}`);
      fetchSession(key);
    }
  };

  const fetchSession = async (key: string) => {
    if (!key) {
      return;
    }
    try {
      const response = await myAxios.post("/receive", {
        sessionId: key,
      });

      if (response.data.data.visibility === "public") {
        setSession(response.data.data);
        fetchContent(key);
        router.push(`/t/receive?key=${response.data.data.sessionId}`);
      } else {
        setPasswordRequired(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchContent = async (password?: string) => {
    if (!key) {
      return;
    }
    setLoading(true);
    try {
      const response = await myAxios.post(`/receive/${key}`, {
        password: password,
      });
      setSession(response.data.data.session);
      setContent(response.data.data.content);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (key) {
      setLinkKey(key);
      fetchSession(key);
    }
  }, []);

  if (!session || !key) {
    return (
      <EnterKey
        linkKey={linkKey}
        setLinkKey={setLinkKey}
        password={password}
        passwordRequired={passwordRequired}
        setPassword={setPassword}
        handleSubmit={
          passwordRequired ? () => fetchContent(password) : handleSubmit
        }
      />
    );
  }

  if (content) {
    return <Session content={content} session={session} />;
  }

  if (loading) {
    return <>Loading</>;
  }

  return <>Unable to fetch</>;
}
