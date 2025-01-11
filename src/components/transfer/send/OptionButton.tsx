import React from "react";

type Props = {
  active: boolean;
  icon: React.ReactNode;
  titleText: string;
  subText: string;
  onClick: () => void;
  isPassword?: boolean;
  password?: string;
};

export default function OptionButton({
  active,
  icon,
  titleText,
  subText,
  onClick,
  isPassword,
  password,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between p-4 ${
        active
          ? "bg-blue-600 text-white shadow-md"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      } rounded-lg cursor-pointer relative`}
    >
      <div className="flex items-center gap-3">
        <div className={`h-5 w-5 ${active ? "text-white" : ""}`}>{icon}</div>
        <div>
          <h3 className="font-medium">{titleText}</h3>
          <p
            className={`text-sm ${
              active ? "text-gray-200" : "text-gray-600 dark:text-gray-400"
            }`}
          >
            {subText}
          </p>
        </div>
      </div>
      {isPassword && password && <div className="">Edit</div>}
    </div>
  );
}
