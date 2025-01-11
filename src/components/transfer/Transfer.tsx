"use client";
import { useState } from "react";
import TabItem from "../TabIcon";
import { FiSend } from "react-icons/fi";
import { IoCloudDownload } from "react-icons/io5";
import Send from "./send/Send";
import Receive from "./Receive";

export default function Transfer() {
  const [selectedTab, setSelectedTab] = useState<"send" | "receive">("send");

  return (
    <div className="flex flex-col md:gap-x-5 md:flex-row w-full mt-5 md:mt-10 px-4 relative">
      <div className="w-full md:w-1/5 hidden md:inline-block space-y-3">
        <TabItem
          label="Send"
          icon={<FiSend />}
          active={selectedTab === "send"}
          onClick={() => setSelectedTab("send")}
        />
        <TabItem
          label="Receive"
          icon={<IoCloudDownload />}
          active={selectedTab === "receive"}
          onClick={() => setSelectedTab("receive")}
        />
      </div>

      <div className="fixed bottom-6 left-0 right-0 flex w-full justify-center md:hidden">
        <div className="flex gap-2 rounded-xl border border-black/10 p-1 dark:border-white/10">
          <TabItem
            label="Send"
            icon={<FiSend />}
            active={selectedTab === "send"}
            onClick={() => setSelectedTab("send")}
          />
          <TabItem
            label="Receive"
            icon={<IoCloudDownload />}
            active={selectedTab === "receive"}
            onClick={() => setSelectedTab("receive")}
          />
        </div>
      </div>

      <div className="w-full md:w-4/5">
        {selectedTab === "send" ? <Send /> : <Receive />}
      </div>
    </div>
  );
}
