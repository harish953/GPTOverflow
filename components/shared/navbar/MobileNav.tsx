"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { SignedOut } from "@clerk/nextjs";
import { Button } from "../../ui/button";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
// import { SignedOut } from "@clerk/nextjs/app-beta";

const NavContent = () => {
  const pathName = usePathname();
  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathName.includes(item.route) && item.route.length > 1) ||
          pathName === item.route;
        return (
          <SheetClose asChild key={item.route}>
            <Link
              href={item.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg"
                  : "text-dark300_light900 text-light-900 "
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p
                className={`${
                  isActive ? "base-bold text-white" : "base-medium"
                }`}
              >
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Image
          src="/assets/icons/hamburger.svg"
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="background-light900_dark200 border-none"
      >
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/icons/logo.svg"
            width={23}
            height={23}
            alt="GPTOverflow"
          />
          <p className="h2-bold text-dark100_light900 font-spaceGrotesk dark:text-white ">
            GPT<span className="text-primary-500">Overflow</span>
          </p>
        </Link>
        <div>
          <SheetClose asChild>
            <NavContent />
          </SheetClose>
          <SignedOut>
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Link href="/sign-in">
                  <Button
                    className="small-medium  btn-secondary
                    my-2 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
                  >
                    <span className="primary-text-gradient">Log In</span>
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
          <SignedOut>
            <div className="flex flex-col gap-4">
              <SheetClose asChild>
                <Link href="/sign-up">
                  <Button
                    className="small-medium  light-border-2 btn-tertiary
                    text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
                  >
                    Sign Up
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
