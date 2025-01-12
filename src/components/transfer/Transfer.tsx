"use client";
import { useEffect, useState } from "react";
import TabItem from "../TabIcon";
import { FiSend } from "react-icons/fi";
import { IoCloudDownload } from "react-icons/io5";
import Send from "./send/Send";
import Receive from "./receive/Receive";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function Transfer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams<{ tab: string }>();

  const handleSelectSend = () => {
    router.push("/t/send");
  };
  const handleSelectReceive = () => {
    router.push("/t/receive");
  };

  return (
    <div className="flex flex-col md:gap-x-5 md:flex-row w-full mt-5 md:mt-10 px-4 relative pb-24 md:pb-10">
      <div className="w-full md:w-1/5 hidden md:inline-block space-y-3 ">
        <TabItem
          label="Send"
          icon={<FiSend />}
          active={params.tab === "send"}
          onClick={handleSelectSend}
        />
        <TabItem
          label="Receive"
          icon={<IoCloudDownload />}
          active={params.tab === "receive"}
          onClick={handleSelectReceive}
        />
      </div>

      <div className="fixed bottom-6 left-0 right-0 flex w-full justify-center md:hidden z-[999]">
        <div className="flex gap-2 rounded-xl border border-black/10 p-1 dark:border-white/10 bg-white dark:bg-gray-950">
          <TabItem
            label="Send"
            icon={<FiSend />}
            active={params.tab === "send"}
            onClick={handleSelectSend}
          />
          <TabItem
            label="Receive"
            icon={<IoCloudDownload />}
            active={params.tab === "receive"}
            onClick={handleSelectReceive}
          />
        </div>
      </div>

      <div className="w-full md:w-4/5">
        {params.tab === "send" ? <Send /> : <Receive />}
      </div>
    </div>
  );
}
