"use client";
import React from "react";
import Logo from "../home/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Dashboard",
    path: "/app/dashboard",
    pathName: "dashboard",
  },
  {
    label: "Account",
    path: "/app/account",
    pathName: "account",
  },
];

const AppHeader = () => {
  const path = usePathname();
  const activePath = path.split("/")[2];
  return (
    <header className="flex justify-between border-b border-offWhite/15 py-2">
      <Logo />
      <nav>
        <ul className="flex items-center gap-2 text-lg">
          {routes.map((route) => (
            <li key={route.label.toLowerCase()}>
              <Link
                href={route.path}
                className={cn(
                  "rounded-md px-2 py-1 text-offWhite/70 transition hover:text-offWhite focus:text-white",
                  "",
                  {
                    "bg-richBlack/5 font-semibold text-offWhite":
                      route.pathName === activePath,
                  },
                )}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
