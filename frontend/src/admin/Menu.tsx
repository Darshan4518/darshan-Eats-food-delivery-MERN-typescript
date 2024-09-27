import ShimmerButton from "@/components/magicui/shimmer-button";
import MenuForm from "@/admin/MenuForm";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Edit, Plus } from "lucide-react";
import { useState } from "react";
import { useMenuStore } from "@/store/useMenuStore";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { toast } from "sonner";
import axios from "axios";

const API_END_POINT = "http://localhost:8000/api/v1/menu";

const Menu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<any>(null); // Track selected menu
  const { loading } = useMenuStore();
  const { restaurant } = useRestaurantStore();

  const SkeletonCard = () => {
    return (
      <div className="rounded-lg p-4 shadow-sm bg-white dark:bg-gray-800 xl:w-[30%] sm:w-[45%] w-full">
        <Skeleton className="h-36 w-full rounded-md dark:bg-gray-700" />
        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-3/4 dark:bg-gray-700" />
          <Skeleton className="h-4 w-1/2 dark:bg-gray-700" />
        </div>
        <div className="mt-6 flex items-center gap-8 text-xs">
          <Skeleton className="h-4 w-1/4 dark:bg-gray-700" />
          <Skeleton className="h-4 w-1/4 dark:bg-gray-700" />
        </div>
        <div className="gap-3 flex flex-wrap my-3 w-full">
          <Skeleton className="h-6 w-16 rounded-full dark:bg-gray-700" />
          <Skeleton className="h-6 w-16 rounded-full dark:bg-gray-700" />
          <Skeleton className="h-6 w-16 rounded-full dark:bg-gray-700" />
        </div>
        <div className="mt-3 w-full flex justify-center items-center">
          <Skeleton className="h-10 w-24 rounded dark:bg-gray-700" />
        </div>
      </div>
    );
  };

  const fetchMenu = async (menuId: string) => {
    try {
      const response = await axios.get(`${API_END_POINT}/${menuId}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setSelectedMenu(response.data.menu);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch menu");
    }
  };

  const handleEditClick = (menuId: string) => {
    setOpen(true);
    fetchMenu(menuId);
  };

  return (
    <div className="max-w-6xl w-full mx-auto md:p-10 p-4 ">
      <div className="w-full flex items-center justify-between">
        <h3 className="text-gray-800 text-lg font-bold dark:text-gray-300">
          Menus
        </h3>
        <Button
          className="sm:text-sm text-xs flex items-center gap-x-1 px-2 bg-orange-500 hover:bg-orange-400 dark:bg-orange-600 dark:hover:bg-orange-500"
          onClick={() => {
            setOpen(true);
            setSelectedMenu(null);
          }}
        >
          <Plus size={16} /> <span>Add Menu</span>
        </Button>
      </div>
      <div>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 my-3 justify-center">
          {loading
            ? Array(restaurant?.menus?.length)
                .fill(0)
                .map((_, ind) => <SkeletonCard key={ind} />)
            : restaurant?.menus?.map((menu: any, ind: number) => (
                <div key={ind} className="xl:w-[30%] sm:w-[45%] w-full">
                  <div className="block rounded-lg p-4 shadow-sm bg-white shadow-indigo-100 hover:shadow-md transition-shadow dark:bg-gray-800 dark:shadow-gray-700">
                    <img
                      alt="Property"
                      src={menu?.image}
                      className="h-36 w-full rounded-md object-fill"
                    />
                    <h3 className="my-2 font-semibold text-lg dark:text-white">
                      {menu?.name}
                    </h3>
                    <p className="text-gray-600 my-2 font-semibold text-sm dark:text-gray-300 line-clamp-2">
                      {menu?.description}
                    </p>
                    <h3 className="text-sm font-bold text-gray-700 my-3 flex items-center dark:text-gray-300">
                      Price :
                      <span className="text-orange-500 mx-2">
                        {menu?.price} INR
                      </span>
                    </h3>
                    <div className="mt-3 w-full flex justify-center items-center">
                      <ShimmerButton
                        className="shadow-2xl py-2 bg-orange-400 dark:bg-orange-500"
                        onClick={() => handleEditClick(menu?._id)}
                      >
                        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white flex items-center gap-x-1">
                          <Edit size={16} />
                          Edit Menu
                        </span>
                      </ShimmerButton>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
      <MenuForm open={open} setOpen={setOpen} menuData={selectedMenu} />
    </div>
  );
};

export default Menu;
