import { cn } from "@/lib/utils";
import React from "react";

const H1 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1 className={cn("text-2xl font-medium leading-6", className)}>
      {children}
    </h1>
  );
};

export default H1;
