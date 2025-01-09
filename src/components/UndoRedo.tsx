import { Button } from "./ui/button";

interface Props {
  undo: () => void;
  redo: () => void;
}

const UndoRedo = ({undo, redo}: Props) => {
  return (
    <div className="absolute z-50 left-0 top-0">
      <Button onClick={undo}>Undo</Button>
      <Button onClick={redo}>Redo</Button>
    </div>
  );
};
export default UndoRedo;
