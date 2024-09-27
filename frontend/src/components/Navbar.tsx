import { Link } from "react-router-dom";
import {
  Hotel,
  Menu,
  ShoppingCartIcon,
  LayoutDashboard,
  ClipboardList,
  FileText,
  Home,
} from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuthModel } from "@/store/useAuthModel";
import { useUserStore } from "@/store/useUserStore";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import ToggleDarkModeBtn from "./ToggleDarkModeBtn";
import { useCartStore } from "@/store/useCartStore";

interface NavLink {
  path: string;
  label: string;
  icon?: JSX.Element;
}

const Navbar: React.FC = () => {
  const { setOpen } = useAuthModel();
  const { isAuthenticated, logout, user } = useUserStore();

  const navLinks: NavLink[] = [
    { path: "/", label: "Home" },
    { path: "/search/india", label: "Restaurants" },
    { path: "#about", label: "About" },
    { path: "#blog", label: "Blog" },
    { path: "#service", label: "Services" },
  ];

  return (
    <header className="sticky top-0 z-10 shadow-sm bg-white/80 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link
              className="block text-teal-600 dark:text-teal-400"
              to="/profile"
            >
              <Avatar className="w-10 h-10">
                <AvatarImage src={user?.profilePicture} alt="Logo" />
                <AvatarFallback>D</AvatarFallback>
              </Avatar>
            </Link>
          </div>

          <nav className="hidden md:block" aria-label="Global">
            <ul className="flex items-center gap-6 text-sm">
              {navLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    className="text-gray-600 dark:text-gray-300 transition hover:text-gray-500 dark:hover:text-gray-400 font-bold"
                    to={path}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              {user?.role === "admin" && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <h3 className="text-gray-600 dark:text-gray-300 transition hover:text-gray-500 dark:hover:text-gray-400 font-bold cursor-pointer">
                      Admin
                    </h3>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40 translate-x-10 duration-150 bg-white dark:bg-gray-800 rounded-md shadow-md">
                    <ul className="p-3 space-y-3">
                      {[
                        { path: "/admin/dashboard", label: "Dashboard" },
                        { path: "/admin/restaurant", label: "Restaurant" },
                        { path: "/admin/menu", label: "Menu" },
                        { path: "/admin/orders", label: "Orders" },
                      ].map(({ path, label }) => (
                        <li key={path}>
                          <Link to={path} className="text-sm font-bold">
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-6">
            <div className="sm:flex sm:gap-4 hidden">
              {isAuthenticated ? (
                <Button
                  onClick={logout}
                  className="rounded-md bg-[#FF6B6B] px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-red-600"
                >
                  Logout
                </Button>
              ) : (
                <Button
                  onClick={() => setOpen(true)}
                  className="rounded-md bg-green-400 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-green-500"
                >
                  Login
                </Button>
              )}
            </div>

            <ToggleDarkModeBtn />
            <CartIcon />
            <div className="block md:hidden">
              <MobileNavbar />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const CartIcon = () => {
  const { cart } = useCartStore();
  return (
    <Link to={"/cart"} className="relative">
      <ShoppingCartIcon className="text-gray-600 dark:text-gray-300 font-bold" />
      {cart?.length > 0 && (
        <span className="bg-[#FF6B6B] dark:bg-[#FF6B6B] rounded-full py-1 px-2 text-[10px] text-center text-white font-bold absolute top-0 right-0 -mt-3 -mr-2">
          {cart?.length}
        </span>
      )}
    </Link>
  );
};

const MobileNavbar = () => {
  const { user } = useUserStore();
  const adminLinks: NavLink[] = [
    { path: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard /> },
    { path: "/admin/restaurant", label: "create Restaurant", icon: <Hotel /> },
    { path: "/admin/menu", label: "Menu", icon: <FileText /> },
    { path: "/admin/orders", label: "Orders", icon: <ClipboardList /> },
  ];

  const userLinks: NavLink[] = [
    { path: "/", label: "Home", icon: <Home /> },
    { path: "/search/india", label: "Restaurants", icon: <Hotel /> },
    { path: "/cart", label: "Menu", icon: <ShoppingCartIcon /> },
  ];

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-gray-100">
        <SheetHeader>
          <SheetTitle className="my-2 text-gray-900 dark:text-gray-100">
            DarshanEats Admin
          </SheetTitle>
        </SheetHeader>
        <SheetDescription className="flex-1 space-y-6 my-6">
          {userLinks.map(({ path, label, icon }) => (
            <Link
              key={path}
              to={path}
              className="text-gray-700 dark:text-gray-100 transition font-bold flex items-center gap-x-2 hover:text-gray-500 dark:hover:text-gray-400"
            >
              {icon}
              {label}
            </Link>
          ))}

          {user?.role === "admin" &&
            adminLinks.map(({ path, label, icon }) => (
              <Link
                key={path}
                to={path}
                className="text-gray-700 dark:text-gray-100 transition font-bold flex items-center gap-x-2 hover:text-gray-500 dark:hover:text-gray-400"
              >
                {icon}
                {label}
              </Link>
            ))}
        </SheetDescription>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" className="dark:bg-[#2E2E2E]">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;
