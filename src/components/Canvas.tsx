"use client";

import React, { useRef, useState, useEffect } from "react";
import Tools from "./Tools";
import ToolsDetails from "./ToolsDetails";
import { defaultColor } from "@/constants";
import UndoRedo from "./UndoRedo";
import Reset from "./Reset";

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

  const scale = window.devicePixelRatio * 1.5; // Adjust the scaling factor for higher DPI

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

    context!.lineWidth = strokeSize;
    context!.strokeStyle = strokeColor;
    context!.lineCap = "round";

    if (selectedTool === "Eraser") {
      context!.strokeStyle = "#09090B";
    } else {
      context!.strokeStyle = strokeColor;
    }

    context?.beginPath();
    context?.moveTo(startPoint.x, startPoint.y);
    context?.lineTo(x, y);
    context?.stroke();

    setStartPoint({ x, y });
  };

  const undo = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      const lastState = newHistory.pop();
      setHistory(newHistory);

      if (lastState) {
        setRedoStack((prev) => [...prev, lastState]);
      }

      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");

      if (canvas && context) {
        const img = new Image();
        img.src = newHistory[newHistory.length - 1];
        img.onload = () => {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(
            img,
            0,
            0,
            canvas.width / scale,
            canvas.height / scale
          );
        };
      }
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const newRedoStack = [...redoStack];
      const lastState = newRedoStack.pop();
      setRedoStack(newRedoStack);

      if (lastState) {
        setHistory((prev) => [...prev, lastState]);

        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        if (canvas && context) {
          const img = new Image();
          img.src = lastState;
          img.onload = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(
              img,
              0,
              0,
              canvas.width / scale,
              canvas.height / scale
            );
          };
        }
      }
    }
  };

  const handleEnd = () => {
    if (selectedTool !== "Select" && isDrawing && canvasRef.current) {
      const canvas = canvasRef.current;
      const dataUrl = canvas.toDataURL();

      if (history[history.length - 1] !== dataUrl) {
        setHistory((prev) => [...prev, dataUrl]);
      }

      setRedoStack([]);
    }
    setIsDrawing(false);
    setStartPoint(null);
  };

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);

      const emptyState = canvas.toDataURL();
      setHistory([emptyState]);
      setRedoStack([]);
    }
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    if (canvasRef.current) {
      const canvas = canvasRef.current;
      setHistory([canvas.toDataURL()]);
    }

    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useEffect(() => {
    if (selectedTool === "Eraser") {
      document.body.style.cursor = `url('/eraser.png') 16 16, auto`;
    } else if (selectedTool !== "Select" && selectedTool !== "Eraser") {
      document.body.style.cursor = "crosshair";
    } else {
      document.body.style.cursor = "default";
    }

    return () => {
      document.body.style.cursor = "default";
    };
  }, [selectedTool]);

  return (
    <div className={`w-full h-screen overflow-hidden flex justify-center`}>
      <canvas
        ref={canvasRef}
        style={{
          border: "1px solid black",
          touchAction: "none",
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
          selectedTool={selectedTool}
        />
      )}
      <UndoRedo
        undo={undo}
        redo={redo}
        undoDisabled={history.length <= 1}
        redoDisabled={redoStack.length === 0}
      />
      <Reset resetCanvas={resetCanvas}/>
    </div>
  );
};

export default DrawingCanvas;
