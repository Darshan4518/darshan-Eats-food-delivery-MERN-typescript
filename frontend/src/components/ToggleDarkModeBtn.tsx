import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

const ToggleDarkModeBtn = () => {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    if (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            {theme === "light" ? (
              <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-500" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem] text-gray-300" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </div>
  );
};

export default ToggleDarkModeBtn;
