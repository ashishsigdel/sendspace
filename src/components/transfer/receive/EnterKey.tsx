import TabItem from "@/components/TabIcon";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

type Props = {
  linkKey: string;
  setLinkKey: any;
  handleSubmit: any;
};

export default function EnterKey({ linkKey, setLinkKey, handleSubmit }: Props) {
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setLinkKey(text);
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };
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
          active={false}
          onClick={handlePaste}
        />
      </div>

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
