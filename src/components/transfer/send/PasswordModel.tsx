"use client";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type Props = {
  password: string;
  setPassword: any;
  setShowPasswordModal: any;
  setIsPublic: any;
};

export default function PasswordModel({
  password,
  setPassword,
  setShowPasswordModal,
  setIsPublic,
}: Props) {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white dark:bg-black border border-black/20 dark:border-white/20 p-6 shadow-lg">
        <h3 className="mb-4 text-lg font-semibold">Set Password</h3>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-black/20 dark:border-white/20 px-3 py-2"
            placeholder="Password"
          />
          <div
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 px-4 py-2"
            onClick={() => {
              if (password.trim()) {
                setShowPasswordModal(false);
              } else {
                setIsPublic(true);
                setShowPasswordModal(false);
              }
            }}
          >
            Cancel
          </button>
          <button
            className="rounded-lg bg-blue-color px-4 py-2 text-white hover:opacity-90"
            onClick={() => {
              if (password.trim()) {
                if (password.length < 5) {
                  toast("Password must be at least 5 chars!", {
                    icon: "⚠️",
                    style: {
                      borderRadius: "10px",
                      background: theme === "dark" ? "#333" : "#fff",
                      color: theme === "dark" ? "#fff" : "#333",
                    },
                  });
                } else {
                  setIsPublic(false);
                  setShowPasswordModal(false);
                  toast.success("Password created!", {
                    style: {
                      borderRadius: "10px",
                      background: theme === "dark" ? "#333" : "#fff",
                      color: theme === "dark" ? "#fff" : "#333",
                    },
                  });
                }
              } else {
                toast("Password cannot empty!", {
                  icon: "⚠️",
                  style: {
                    borderRadius: "10px",
                    background: theme === "dark" ? "#333" : "#fff",
                    color: theme === "dark" ? "#fff" : "#333",
                  },
                });
              }
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
