"use client";

import React, { useRef, useState, useEffect } from "react";
import Tools from "./Tools";
import ToolsDetails from "./ToolsDetails";
import { defaultColor } from "@/constants";
import UndoRedo from "./UndoRedo";

const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(
    null
  );
  const [strokeSize, setStrokeSize] = useState<number>(2);
  const [strokeColor, setStrokeColor] = useState<string>(defaultColor);
  const [selectedTool, setSelectedTool] = useState<string>("Select");
  const [history, setHistory] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  const scale = window.devicePixelRatio * 3; // Adjust the scaling factor for higher DPI

  const resizeCanvas = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.width = window.innerWidth * scale;
      canvas.height = window.innerHeight * scale;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      context?.scale(scale, scale);
    }
  };

  const getPosition = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if ("nativeEvent" in e && e.nativeEvent instanceof MouseEvent) {
      return { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    } else if ("touches" in e) {
      const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return { x: 0, y: 0 };
  };

  const handleStart = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    e.preventDefault();
    setIsDrawing(true);
    const { x, y } = getPosition(e);
    setStartPoint({ x, y });
  };

  const handleMove = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (
      !isDrawing ||
      !startPoint ||
      !canvasRef.current ||
      selectedTool === "Select"
    )
      return;

    const { x, y } = getPosition(e);

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set brush size and color dynamically
    context!.lineWidth = strokeSize;
    context!.strokeStyle = strokeColor;
    context!.lineCap = "round"; // Smooth lines

    context?.beginPath();
    context?.moveTo(startPoint.x, startPoint.y);
    context?.lineTo(x, y);
    context?.stroke();

    setStartPoint({ x, y });
  };

  const undo = () => {
    if (history.length > 1) {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");

      if (canvas && context) {
        const newHistory = [...history];
        const lastState = newHistory.pop(); // Remove the current state
        setHistory(newHistory);

        if (lastState) {
          setRedoStack((prev) => [...prev, lastState]); // Push current state to redo stack
        }

        // Redraw the previous state
        const img = new Image();
        img.src = newHistory[newHistory.length - 1]; // Use the last saved state
        img.onload = () => {
          context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
          context.drawImage(
            img,
            0,
            0,
            canvas.width / scale,
            canvas.height / scale
          ); // Redraw with proper scaling
        };
      }
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");

      if (canvas && context) {
        const newRedoStack = [...redoStack];
        const lastState = newRedoStack.pop(); // Restore the last undone state
        setRedoStack(newRedoStack);

        if (lastState) {
          setHistory((prev) => [...prev, lastState]); // Add restored state back to history

          const img = new Image();
          img.src = lastState;
          img.onload = () => {
            context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
            context.drawImage(
              img,
              0,
              0,
              canvas.width / scale,
              canvas.height / scale
            ); // Redraw with proper scaling
          };
        }
      }
    }
  };

  const handleEnd = () => {
    if (selectedTool !== "Select" && canvasRef.current) {
      const canvas = canvasRef.current;
      if (canvas) {
        const dataUrl = canvas.toDataURL(); // Save current state
        setHistory((prev) => [...prev, dataUrl]);
        setRedoStack([]); // Clear redo stack on new drawing
      }
    }
    console.log(history)
    setIsDrawing(false);
    setStartPoint(null);
  };

  useEffect(() => {
    resizeCanvas(); // Initial resize
    window.addEventListener("resize", resizeCanvas); // Listen for window resize
    document.body.style.margin = "0"; // Remove body margin
    document.body.style.overflow = "hidden"; // Disable scrolling

    // Save initial empty state
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      setHistory([canvas.toDataURL()]);
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas); // Cleanup on unmount
    };
  }, []);

  return (
    <div
      className={`w-full h-screen overflow-hidden flex justify-center ${
        selectedTool !== "Select" && "cursor-crosshair"
      }`}
    >
      <canvas
        ref={canvasRef}
        style={{
          border: "1px solid black",

          touchAction: "none", // Prevent pinch zooming and scrolling on mobile
        }}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        onTouchCancel={handleEnd}
      />
      <Tools selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
      {selectedTool !== "Select" && (
        <ToolsDetails
          strokeSize={strokeSize}
          setStrokeSize={setStrokeSize}
          strokeColor={strokeColor}
          setStrokeColor={setStrokeColor}
        />
      )}
      <UndoRedo undo={undo} redo={redo} />
    </div>
  );
};

export default DrawingCanvas;
