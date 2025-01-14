"use client";
import TabItem from "@/components/TabIcon";
import { useRouter } from "next/navigation";
import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center text-center mt-24">
      <FaExclamationTriangle className="text-red-500 text-6xl mb-4" />
      <h1 className="text-2xl font-bold mb-2">Invalid link.</h1>
      <p className="text-gray-600">
        We couldn&#39;t find the content you&#39;re looking for. Please check
        the link and try again.
      </p>
      <div className="mt-5">
        <TabItem
          icon={<></>}
          label="Try another"
          active
          onClick={() => router.push("/t/receive")}
        />
      </div>
    </div>
  );
}
