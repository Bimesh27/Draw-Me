import { ModeToggle } from "./ModeToggle";

const Menu = () => {
  return (
    <div className="w-full h-16 bg-white dark:bg-black flex items-center justify-between px-4 z-50">
      <ModeToggle />
    </div>
  );
};
export default Menu;
