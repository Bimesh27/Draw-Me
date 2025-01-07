import { Button } from "./ui/button";
import { toolsItems } from "@/constants";
import React from "react";

const Tools = () => {
  return (
    <div className="h-12 min-w-[32rem] bg-[#232329] rounded-xl border z-50 absolute bottom-16  max-sm:min-w-[20rem] max-md:min-w-[30rem]">
      <div className="flex space-x-2 justify-center items-center w-full h-full hover:cursor-pointer">
        {toolsItems.map((tool) => (
          <Button
            className="px-3 py-5 bg-transparent hover:bg-[#38383f]"
            key={tool.name}
          >
            {tool.icon}
          </Button>
        ))}
      </div>
    </div>
  );
};
export default Tools;
