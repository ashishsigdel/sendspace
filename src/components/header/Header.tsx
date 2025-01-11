"use client";
import { LogoIcon, ThemeToggle } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { GoDotFill } from "react-icons/go";

export default function Header() {
  const pathname = usePathname();

  const isActive = (name: string) => {
    if (!name) return false;
    return pathname.split("/")[1] === name;
  };

  return (
    <div className="flex h-[72px] md:h-[96px] items-center border-b border-black/10 shadow-sm shadow-black/10 dark:border-white/10 dark:shadow-white/5 z-[9999]">
      <div className="mx-auto w-full max-w-7xl px-5">
        <div className="flex items-center justify-between">
          <Link href={"/"} className="flex items-center gap-2">
            <LogoIcon size="50" />
            <h2 className="hidden text-2xl font-semibold uppercase text-black dark:text-white md:inline-block">
              Send
              <span className="text-blue-color">Space</span>
            </h2>
          </Link>
          <div className="flex items-center gap-x-5">
            <Link href={"/t/send"}>
              <label
                className={`${
                  isActive("transfer")
                    ? "text-blue-color font-semibold"
                    : "font-normal"
                } cursor-pointer`}
              >
                Transfer
              </label>
            </Link>
            <Link href={"/"}>
              <label
                className={`${
                  isActive("receive")
                    ? "text-blue-color font-semibold"
                    : "font-normal"
                } relative flex cursor-pointer items-center gap-2`}
              >
                Get Premium
                <GoDotFill
                  color={"red"}
                  className="absolute -right-3 top-0"
                  size={14}
                />
              </label>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
