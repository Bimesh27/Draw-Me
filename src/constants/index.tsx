import {
  Circle,
  Eraser,
  Hand,
  Image,
  LetterText,
  Minus,
  MoveRight,
  Pencil,
  Square,
} from "lucide-react";

const iconColor = "#E0DFFF";

export const toolsItems = [
  {
    name: "Pencil",
    icon: <Pencil color={iconColor} />,
  },
  {
    name: "Eraser",
    icon: <Eraser color={iconColor} />,
  },
  {
    name: "Drag",
    icon: <Hand color={iconColor} />,
  },
  {
    name: "Arrow",
    icon: <MoveRight color={iconColor} />,
  },
  {
    name: "Text",
    icon: <LetterText color={iconColor} />,
  },
  {
    name: "Square",
    icon: <Square color={iconColor} />,
  },
  {
    name: "Circle",
    icon: <Circle color={iconColor} />,
  },
  {
    name: "Line",
    icon: <Minus color={iconColor} />,
  },
  {
    name: "Image",
    icon: <Image color={iconColor} />,
  },
];
