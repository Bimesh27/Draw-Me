import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { RotateCcw } from "lucide-react";
import { Button } from "./ui/button";

const Reset = ({ resetCanvas }: { resetCanvas: () => void }) => {
  return (
    <div className="absolute right-20 mt-4">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-tool hover:bg-toolhover text-text">
            Reset Canvas <RotateCcw />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xl">
              This action cannot be undone, This will clear all the Canvas
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={resetCanvas}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default Reset;
