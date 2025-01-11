import React from "react";

type Props = {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick?: () => void;
};

export default function TabItem({ label, icon, active, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-center space-x-3 rounded-lg px-5 py-2 text-lg font-medium transition-all ${
        active
          ? "bg-blue-600 text-white shadow-md"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      }`}
    >
      {icon}
      <span>{label}</span>{" "}
    </div>
  );
}
