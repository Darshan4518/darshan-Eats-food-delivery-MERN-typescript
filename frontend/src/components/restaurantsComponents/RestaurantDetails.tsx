import {
  Globe2,
  HandPlatterIcon,
  LucideTimer,
  MapPin,
  MapPinnedIcon,
} from "lucide-react";
import AvailableMenus from "./AvailableMenus";
import { Skeleton } from "../ui/skeleton";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { Badge } from "../ui/badge";

const RestaurantDetails = () => {
  const { id } = useParams();
  const { loading, getSingleRestaurant, restaurantDetail } =
    useRestaurantStore();

  useEffect(() => {
    getSingleRestaurant(id as string);
  }, [id, getSingleRestaurant]);

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

        <div className="flex flex-wrap gap-2">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <Skeleton
                key={index}
                className="w-20 h-8 rounded-full bg-gray-200 dark:bg-gray-700"
              />
            ))}
        </div>
      </div>
    );
  };

  return (
    <div className="dark:bg-gray-900 dark:text-gray-100 bg-white text-gray-800 w-full">
      <div className="max-w-6xl mx-auto md:p-4 p-2">
        <div>
          {loading ? (
            <RenderSkeleton />
          ) : (
            <>
              <img
                src={restaurantDetail?.imageUrl}
                alt="Restaurant"
                className="w-full lg:h-[50vh] h-46 object-fill rounded-md shadow-lg"
              />
              <h3 className="text-2xl font-bold text-gray-800 py-6 text-center dark:text-gray-300">
                {restaurantDetail?.restaurantName}
              </h3>
              <p className="text-base font-bold text-gray-800 py-6 text-center dark:text-gray-300">
                {restaurantDetail?.restaurantDescription}
              </p>
              <div className="flex gap-5 flex-col justify-between text-sm my-5">
                <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                  <MapPin className="size-4 text-indigo-700 dark:text-indigo-400" />
                  <div className="mt-1.5 sm:mt-0">
                    <p className="text-gray-500 dark:text-gray-400">Address</p>
                    <p className="font-medium dark:text-gray-200">
                      {restaurantDetail?.address}
                    </p>
                  </div>
                </div>
                <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                  <MapPinnedIcon className="size-4 text-indigo-700 dark:text-indigo-400" />
                  <div className="mt-1.5 sm:mt-0">
                    <p className="text-gray-500 dark:text-gray-400">City</p>
                    <p className="font-medium dark:text-gray-200">
                      {restaurantDetail?.city}
                    </p>
                  </div>
                </div>
                <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                  <Globe2 className="size-4 text-indigo-700 dark:text-indigo-400" />
                  <div className="mt-1.5 sm:mt-0">
                    <p className="text-gray-500 dark:text-gray-400">Country</p>
                    <p className="font-medium dark:text-gray-200">
                      {restaurantDetail?.country}
                    </p>
                  </div>
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
                  {restaurantDetail?.deliveryTime} Minutes
                </p>
              </div>
              <div className="flex items-center gap-x-5 w-full">
                <h3 className="font-bold text-gray-700 text-base dark:text-white flex items-center gap-x-2">
                  <HandPlatterIcon className="size-4 text-indigo-700 dark:text-indigo-400" />{" "}
                  Cuisines:
                </h3>
                <div className="gap-3 flex flex-wrap">
                  {restaurantDetail?.menus?.map((item: any, ind: number) => (
                    <Badge
                      className="bg-black text-white dark:bg-white dark:text-black p-1 px-2 cursor-pointer"
                      key={ind}
                    >
                      {item?.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div>
          <div className="my-5 font-bold text-xl px-3 text-gray-800 dark:text-gray-300">
            <h3 className="text-3xl dark:text-white text-gray-700 font-bold my-5 text-center underline">
              Our Menus
            </h3>
            <AvailableMenus menus={restaurantDetail?.menus} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
