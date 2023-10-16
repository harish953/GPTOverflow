"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface customInputProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses: string;
}

const LocalSearch = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: customInputProps) => {
  return (
    <div
      className={`background-light800_darkgradient  flex min-h-[56px]
      grow items-center gap-6 rounded-xl px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        ></Image>
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value=""
        onChange={() => {}}
        className="paragraph-regular no-focus placeholder
          background-light800_darkgradient
          border-none shadow-none outline-none"
      />
    </div>
  );
};

export default LocalSearch;
