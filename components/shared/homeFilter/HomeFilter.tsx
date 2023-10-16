"use client";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import React from "react";

const HomeFilter = () => {
  const active = "newest";
  return (
    <div
      className="mt-10 hidden flex-wrap
  gap-3 md:flex md:flex-row"
    >
      {HomePageFilters.map((item) => {
        return (
          <Button
            key={item.value}
            onClick={() => {}}
            className={`body-medium rounded-lg px-6 py-3 
          capitalize shadow-none ${
            active === item.value
              ? "bg-primary-100 text-primary-500"
              : "bg-light-800 text-light-500 hover:bg-light-900 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"
          } `}
          >
            {item.name}
          </Button>
        );
      })}
    </div>
  );
};

export default HomeFilter;
