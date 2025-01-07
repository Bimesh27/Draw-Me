"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <>
      <Sun
        className={cn(
          "size-4 hover:cursor-pointer",
          theme === "dark" && "scale-0 absolute opacity-0"
        )}
        onClick={() => setTheme("dark")}
      />
      <Moon
        className={cn(
          "size-4 hover:cursor-pointer",
          theme === "light" && "scale-0 absolute opacity-0"
        )}
        onClick={() => setTheme("light")}
      />
    </>
  );
}
