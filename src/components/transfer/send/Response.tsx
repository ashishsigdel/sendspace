import TabItem from "@/components/TabIcon";
import toast from "react-hot-toast";
import { FaGlobe, FaShare } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import { RiResetRightFill } from "react-icons/ri";

const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

type Props = {
  response: {
    sessionId: string;
    visibility: string;
  } | null;
  setResponse: any;
};

export default function Response({ response, setResponse }: Props) {
  const handleCopy = () => {
    if (response?.sessionId) {
      const url = `${FRONTEND_URL}/t/receive?key=${response.sessionId}`;
      navigator.clipboard
        .writeText(url)
        .then(() => {
          toast.success("Link copied to clipboard!");
        })
        .catch((error) => {
          toast.error("Failed to copy.");
        });
    }
  };
  return (
    <div className="mx-auto w-full max-w-md mt-10 p-4">
      <div className="flex items-center gap-5 justify-between">
        <div className="flex items-center gap-5">
          <FaShare size={28} className="text-blue-color" />
          <div>
            <p>Your Key is:</p>
            <p className="text-3xl font-semibold">{response?.sessionId}</p>
          </div>
        </div>
        <div
          className={`flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300  `}
        >
          <FaGlobe size={14} />
          {response?.visibility}
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mt-7">
        <p className="font-semibold">Share with link</p>
        <span className="text-sm">
          Simply copy your download link below to share your files
        </span>
        <div className="flex gap-2 w-full items-center mt-2">
          <p className="bg-white dark:bg-black px-3 py-2 rounded-lg w-full">
            {FRONTEND_URL}/t/receive?key={response?.sessionId}
          </p>
          <IoCopyOutline className="cursor-pointer" onClick={handleCopy} />
        </div>
      </div>
      <div className="mt-10">
        <TabItem
          icon={<RiResetRightFill />}
          label="Share Again"
          active
          onClick={() => setResponse(null)}
        />
      </div>
    </div>
  );
}
