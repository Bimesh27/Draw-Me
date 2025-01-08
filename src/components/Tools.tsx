import { Button } from "./ui/button";
import { toolsItems } from "@/constants";
import { cn } from "@/lib/utils";
import React, { SetStateAction } from "react";

interface Props {
  selectedTool: string;
  setSelectedTool: React.Dispatch<SetStateAction<string>>;
}

const Tools = ({ selectedTool, setSelectedTool }: Props) => {
  return (
    <div className="h-12 min-w-[32rem] bg-[#232329] rounded-xl border z-50 absolute bottom-16  max-sm:min-w-[20rem] max-md:min-w-[30rem]">
      <div className="flex space-x-2 justify-center items-center w-full h-full hover:cursor-pointer">
        {toolsItems.map((tool) => (
          <Button
            className={cn(
              "px-3 py-5 bg-transparent hover:bg-[#38383f]",
              selectedTool === tool.name && "bg-[#38383f]"
            )}
            key={tool.name}
            onClick={() => setSelectedTool(tool.name)}
          >
            {tool.icon}
          </Button>
        ))}
      </div>
    </div>
  );
};
export default Tools;
