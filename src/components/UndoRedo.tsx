import { Redo2, Undo2 } from "lucide-react";
import { Button } from "./ui/button";
import { defaultColor } from "@/constants";

interface Props {
  undo: () => void;
  redo: () => void;
  history: string[];
  redoStack: string[];
}

const UndoRedo = ({ undo, redo, history, redoStack }: Props) => {
  console.log(history.length);
  console.log(history);
  
  
  return (
    <div className="absolute z-50 mx-auto flex mt-4 rounded-lg cursor-pointer overflow-hidden">
      <Button
        className="rounded-none bg-tool hover:bg-[#38383f]"
        onClick={undo}
        disabled={history.length < 2}
      >
        <Undo2 className="size-3" color={defaultColor} />
      </Button>
      <Button
        className="rounded-none bg-tool hover:bg-[#38383f]"
        onClick={redo}
        disabled={redoStack.length === 0}
      >
        <Redo2 className="size-3" color={defaultColor} />
      </Button>
    </div>
  );
};
export default UndoRedo;
