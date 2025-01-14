"use client";
import TabItem from "@/components/TabIcon";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type Props = {
  password: string;
  setPassword: any;
  fetchContent: any;
  passwordChecking: boolean;
};

export default function PasswordInput({
  password,
  setPassword,
  fetchContent,
  passwordChecking,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password required");
      return;
    } else {
      setPasswordError("");
    }
  };
  return (
    <div className="mx-auto max-w-xl mt-16 space-y-5">
      <div className="mb-4">
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            className={`w-full rounded-lg border ${
              passwordError
                ? "border-red-500"
                : "border-black/20 dark:border-white/20"
            } px-3 py-2 focus:outline-none`}
            placeholder="Secret Password"
            onBlur={validatePassword}
            autoComplete="off"
            name="validpassword"
          />
          <div
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        {passwordError && (
          <p className="text-sm mt-1 text-red-500 italic">⚠️ {passwordError}</p>
        )}
      </div>
      <TabItem
        icon={<></>}
        label={passwordChecking ? "Checking..." : "Check Password"}
        active
        onClick={() => {
          validatePassword();
          if (password && !passwordError) {
            fetchContent(password);
          }
        }}
      />
    </div>
  );
}
