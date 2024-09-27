import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import {
  Edit,
  Globe2,
  HandPlatterIcon,
  Timer,
  MapPin,
  MapPinnedIcon,
} from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Restaurant = () => {
  const navigate = useNavigate();
  const { loading, restaurant, getRestaurant } = useRestaurantStore();

  useEffect(() => {
    if (!restaurant) {
      navigate("/admin/restaurant/create");
    }
    getRestaurant();
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
      <div className="max-w-6xl mx-auto md:p-2 p-2">
        <div>
          {loading ? (
            <RenderSkeleton />
          ) : (
            <div>
              <div className=" flex justify-between sm:flex-row flex-col gap-2 items-center my-3">
                <h1 className="text-xl md:text-3xl font-bold my-4 text-center md:text-left">
                  {restaurant?.restaurantName}
                </h1>
                <Button
                  variant={"outline"}
                  className="flex gap-1 items-center text-sm mx-3 "
                  onClick={() => navigate("/admin/restaurant/create")}
                >
                  <Edit />
                  Edit
                </Button>
              </div>
              <img
                src={restaurant?.imageUrl}
                alt="Restaurant"
                className="w-full lg:h-[50vh] md:h-72 h-48 object-cover rounded-md shadow-lg"
              />
              <p className="text-base md:text-lg font-medium text-gray-800 py-4 md:py-6 text-center md:text-left dark:text-gray-300">
                {restaurant?.restaurantDescription}
              </p>
              <div className="flex flex-wrap gap-4 md:gap-5 justify-between md:items-center text-sm my-5">
                <div className="flex items-start gap-2 w-full sm:w-auto">
                  <MapPin className="w-4 h-4 text-indigo-700 dark:text-indigo-400" />
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Address</p>
                    <p className="font-medium dark:text-gray-200">
                      {restaurant?.address}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2 w-full sm:w-auto">
                  <MapPinnedIcon className="w-4 h-4 text-indigo-700 dark:text-indigo-400" />
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">City</p>
                    <p className="font-medium dark:text-gray-200">
                      {restaurant?.city}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2 w-full sm:w-auto">
                  <Globe2 className="w-4 h-4 text-indigo-700 dark:text-indigo-400" />
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Country</p>
                    <p className="font-medium dark:text-gray-200">
                      {restaurant?.country}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-x-2 w-full sm:w-auto mt-3 md:mt-0">
                  <Timer className="w-4 h-4 text-indigo-700 dark:text-indigo-400" />
                  <span className="font-bold text-gray-700 dark:text-gray-300 text-sm">
                    Delivery Time:
                  </span>
                  <p className="text-orange-500 text-sm font-bold dark:text-orange-300">
                    {restaurant?.deliveryTime} Minutes
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-5 w-full my-3">
                <h3 className="font-bold text-gray-700 text-base dark:text-white flex items-center gap-x-2">
                  <HandPlatterIcon className="w-4 h-4 text-indigo-700 dark:text-indigo-400" />
                  Cuisines:
                </h3>
                <div className="gap-2 flex flex-wrap mt-2">
                  {restaurant?.cuisines?.map((item: any, ind: number) => (
                    <Badge
                      className="bg-black text-white dark:bg-white dark:text-black p-1 px-2 cursor-pointer text-xs md:text-sm"
                      key={ind}
                    >
                      {item}
                    </Badge>
                  ))}
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
