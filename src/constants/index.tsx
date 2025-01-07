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
  "#FFCCCC", // Bright Light Coral
  "#FFE5CC", // Light Tangerine Cream
  "#CCF2FF", // Light Electric Sky Blue
  "#CCE5FF", // Vivid Soft Blue
  "#FFD9E8", // Vibrant Pink Blush
  "#E6CCFF", // Bright Lavender Mist
  "#CCFFCC", // Vibrant Mint Green
  "#FFCCF2", // Light Magenta Pink
  "#FFFFCC", // Vibrant Lemonade Yellow
];
