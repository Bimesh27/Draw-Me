import {
  Circle,
  Eraser,
  Hand,
  Image,
  LetterText,
  Minus,
  MousePointer2,
  MoveRight,
  Pencil,
  Square,
} from "lucide-react";

export const defaultColor = "#E0DFFF";

export const toolsItems = [
  { name: "Select", icon: <MousePointer2 color={defaultColor} /> },
  {
    name: "Pencil",
    icon: <Pencil color={defaultColor} />,
  },
  {
    name: "Eraser",
    icon: <Eraser color={defaultColor} />,
  },
  {
    name: "Drag",
    icon: <Hand color={defaultColor} />,
  },
  {
    name: "Arrow",
    icon: <MoveRight color={defaultColor} />,
  },
  {
    name: "Text",
    icon: <LetterText color={defaultColor} />,
  },
  {
    name: "Square",
    icon: <Square color={defaultColor} />,
  },
  {
    name: "Circle",
    icon: <Circle color={defaultColor} />,
  },
  {
    name: "Line",
    icon: <Minus color={defaultColor} />,
  },
  {
    name: "Image",
    icon: <Image color={defaultColor} />,
  },
];

export const colorSample = [
  "#f87171",
  "#4ade80", // Light Tangerine Cream
  "#60a5fa", // Light Electric Sky Blue
  "#ec4899", // Vivid Soft Blue
  "#ea580c", // Vibrant Pink Blush
  "#0e9e35", // Bright Lavender Mist
  "#5258fa", // Vibrant Mint Green
  "#FFCCF2", // Light Magenta Pink
  "#FFFFCC", // Vibrant Lemonade Yellow
];
