"use client";

import React, { useRef, useState, useEffect } from "react";
import Tools from "./Tools";

const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(
    null
  );

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

  useEffect(() => {
    resizeCanvas(); // Initial resize
    window.addEventListener("resize", resizeCanvas); // Listen for window resize
    document.body.style.margin = "0"; // Remove body margin
    document.body.style.overflow = "hidden"; // Disable scrolling
    return () => {
      window.removeEventListener("resize", resizeCanvas); // Cleanup on unmount
    };
  }, []);

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

  // Handle drawing move (mouse/touch move)
  const handleMove = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing || !startPoint || !canvasRef.current) return;

    const { x, y } = getPosition(e);

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set brush size and color dynamically
    context!.lineWidth = 3;
    context!.strokeStyle = "white";
    context!.lineCap = "round"; // Smooth lines

    context?.beginPath();
    context?.moveTo(startPoint.x, startPoint.y);
    context?.lineTo(x, y);
    context?.stroke();

    setStartPoint({ x, y });
  };

  const handleEnd = () => {
    setIsDrawing(false);
    setStartPoint(null);
  };

  return (
    <div className="w-full h-screen overflow-hidden flex justify-center">
      <canvas
        ref={canvasRef}
        style={{
          border: "1px solid black",
          cursor: "crosshair",
          touchAction: "none", // Prevent pinch zooming and scrolling on mobile
        }}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        onTouchCancel={handleEnd}
      />
      <Tools />
    </div>
  );
};

export default DrawingCanvas;
