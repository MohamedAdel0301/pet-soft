import React from "react";
import { cn } from "@/lib/utils";

type TContetBlock = {
  children: React.ReactNode;
  className?: string;
};

const ContentBlock = ({ children,className }: TContetBlock) => {
  return (
    <div className={cn("h-full w-full overflow-hidden rounded-md bg-[#F7F8FA] shadow-sm",className)}>
      {children}
    </div>
  );
};

export default ContentBlock;
