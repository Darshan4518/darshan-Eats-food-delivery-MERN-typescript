import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import {
  Badge,
  Edit,
  Globe2,
  HandPlatterIcon,
  LucideTimer,
  MapPin,
  MapPinnedIcon,
} from "lucide-react";
import { useEffect } from "react";

const Restaurant = () => {
  const { loading, restaurant, getRestaurant } = useRestaurantStore();
  useEffect(() => {
    const fetch = async () => {
      await getRestaurant();
    };
    fetch();
  }, [getRestaurant]);

  const RenderSkeleton = () => {
    return (
      <div className="max-w-6xl mx-auto md:p-4 p-2">
        <Skeleton className="w-full lg:h-[50vh] h-36 mb-3 bg-gray-200 dark:bg-gray-700 rounded-md" />
        <Skeleton className="w-64 h-8 mx-auto mb-4 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="w-full h-6 mx-auto mb-4 bg-gray-200 dark:bg-gray-700" />

        <div className="flex flex-col gap-3 my-5">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <Skeleton className="w-6 h-6 bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="w-40 h-6 bg-gray-200 dark:bg-gray-700" />
              </div>
            ))}
        </div>

        <div className="my-5 flex items-center gap-x-2">
          <Skeleton className="w-6 h-6 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="w-32 h-6 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="w-24 h-6 bg-gray-200 dark:bg-gray-700" />
        </div>

        <div className="flex items-center gap-3 mb-5">
          <Skeleton className="w-6 h-6 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="w-32 h-6 bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    );
  };

  return (
    <div className="dark:bg-gray-900 dark:text-gray-100 bg-white text-gray-800 w-full relative">
      <div className="max-w-6xl mx-auto md:p-4 p-2">
        <div>
          {loading ? (
            <RenderSkeleton />
          ) : (
            <div className="">
              <h1 className="text-3xl font-bold">
                {restaurant?.restaurantName}
              </h1>
              <img
                src={restaurant?.imageUrl}
                alt="Restaurant"
                className="w-full lg:h-[50vh] h-46 object-fill rounded-md shadow-lg"
              />
              <p className="text-base font-bold text-gray-800 py-6 text-center dark:text-gray-300">
                {restaurant?.restaurantDescription}
              </p>
              <div className="flex gap-5  md:flex-row justify-between md:items-center flex-wrap text-sm my-5">
                <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                  <MapPin className="size-4 text-indigo-700 dark:text-indigo-400" />
                  <div className="mt-1.5 sm:mt-0">
                    <p className="text-gray-500 dark:text-gray-400">Address</p>
                    <p className="font-medium dark:text-gray-200">
                      {restaurant?.address}
                    </p>
                  </div>
                </div>
                <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                  <MapPinnedIcon className="size-4 text-indigo-700 dark:text-indigo-400" />
                  <div className="mt-1.5 sm:mt-0">
                    <p className="text-gray-500 dark:text-gray-400">City</p>
                    <p className="font-medium dark:text-gray-200">
                      {restaurant?.city}
                    </p>
                  </div>
                </div>
                <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                  <Globe2 className="size-4 text-indigo-700 dark:text-indigo-400" />
                  <div className="mt-1.5 sm:mt-0">
                    <p className="text-gray-500 dark:text-gray-400">Country</p>
                    <p className="font-medium dark:text-gray-200">
                      {restaurant?.country}
                    </p>
                  </div>
                </div>
                <div className="my-5 flex items-center gap-x-2">
                  <h3 className="flex items-center gap-x-2">
                    <LucideTimer className="size-4 text-indigo-700 dark:text-indigo-400" />
                    <span className="font-bold text-gray-700 dark:text-gray-300 text-sm">
                      Delivery Time:
                    </span>
                  </h3>
                  <p className="text-orange-500 text-sm font-bold dark:text-orange-300">
                    {restaurant?.deliveryTime} Minutes
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-x-5 w-full my-3">
                <h3 className="font-bold text-gray-700 text-base dark:text-white flex items-center gap-x-2">
                  <HandPlatterIcon className="size-4 text-indigo-700 dark:text-indigo-400" />{" "}
                  Cuisines:
                </h3>
                <div className="gap-3 flex flex-wrap">
                  {restaurant?.menus?.map((item: any, ind: number) => (
                    <Badge
                      className="bg-black text-white dark:bg-white dark:text-black p-1 px-2 cursor-pointer"
                      key={ind}
                    >
                      {item.name}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className=" bg-slate-300/90 shadow-lg absolute bottom-3 right-3 p-4 max-w-[20vw]">
                <p className="my-1 text-center">
                  if you wnat make any changes in restaurant ?
                </p>
                <div className=" w-full flex justify-center">
                  <Button variant={"outline"} className=" my-2">
                    <Edit />
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
