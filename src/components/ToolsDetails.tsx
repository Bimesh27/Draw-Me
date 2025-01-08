"use client";

import React, { SetStateAction, useRef } from "react";
import { Card } from "./ui/card";
import { colorSample } from "@/constants";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Props {
  strokeSize: number;
  strokeColor: string;
  setStrokeSize: React.Dispatch<SetStateAction<number>>;
  setStrokeColor: React.Dispatch<SetStateAction<string>>;
}

const ToolsDetails = ({
  strokeSize,
  setStrokeSize,
  strokeColor,
  setStrokeColor
}: Props) => {
  const colorPickerRef = useRef<HTMLInputElement | null>(null);

  return (
    <Card className="w-[290px] absolute right-8 top-40 bg-[#232329] flex justify-center flex-col p-4">
      <section>
        <span className="text-xl">Stroke</span>
        <div className="flex gap-4 flex-wrap justify-start items-center">
          {colorSample.map((c, idx) => (
            <div
              key={idx}
              className={cn(
                "flex items-center justify-center rounded-md p-1",
                strokeColor === c ? "bg-black" : ""
              )}
            >
              <Button
                className={cn(
                  "size-7 rounded-lg hover:cursor-pointer p-0 hover:scale-105 transition-all"
                )}
                style={{ backgroundColor: c }}
                onClick={() => setStrokeColor(c)}
              ></Button>
            </div>
          ))}

          <button
            className={`size-10 rounded-lg hover:cursor-pointer p-0 hover:scale-105 transition-all`}
            style={{ backgroundColor: strokeColor }}
            onClick={() => colorPickerRef?.current?.click()}
          ></button>
          <Input
            type="color"
            className=" top-12 right-0  scale-0"
            style={{
              position: "absolute",
              top: "50px", // Adjust the top position
              left: "50px", // Adjust the left position
              zIndex: 1000, // Ensure it is above other elements
            }}
            ref={colorPickerRef}
            onChange={(e) => setStrokeColor(e.target.value)}
          />
        </div>
      </section>
      <section className="mt-4 text-xl">
        <span>Stroke size</span>
        <div className="flex space-x-4">
          <Input
            type="range"
            className="w-[80%] p-0"
            value={strokeSize}
            max={20}
            min={1}
            onChange={(e) => setStrokeSize(Number(e.target.value))}
          />
          <span className="font-normal">{strokeSize}</span>
        </div>
      </section>
    </Card>
  );
};
export default ToolsDetails;
