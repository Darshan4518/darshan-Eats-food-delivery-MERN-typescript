import { Globe2, MapPin } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import ShimmerButton from "../magicui/shimmer-button";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { Link } from "react-router-dom";

const RestaurantCard = () => {
  const { restaurants, loading } = useRestaurantStore();

  const SkeletonCard = () => {
    return (
      <div className="rounded-lg p-4 shadow-sm bg-white shadow-indigo-100 dark:bg-slate-300 dark:shadow-gray-700 md:w-[45%] w-full h-auto flex flex-col justify-between">
        <Skeleton className="h-36 w-full rounded-md" />

        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        <div className="mt-6 flex items-center gap-8 text-xs">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>

        <div className="mt-3 w-full flex justify-center items-center">
          <Skeleton className="h-10 w-24 rounded" />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 my-3 justify-center items-center">
      {loading ? (
        Array(restaurants?.length)
          .fill(0)
          .map((_, ind: number) => <SkeletonCard key={ind} />)
      ) : restaurants?.length > 0 ? (
        restaurants?.map((restaurant: any) => (
          <div key={restaurant?._id} className="md:w-[45%] w-full h-auto">
            <div className=" relative rounded-lg p-4 shadow-sm bg-white shadow-indigo-100 hover:shadow-md transition-shadow dark:bg-gray-800 dark:shadow-gray-700 h-full flex flex-col justify-between">
              <img
                alt="Property"
                src={restaurant?.imageUrl}
                className="h-36 w-full rounded-md object-cover"
              />

              <div className="mt-2">
                <dl>
                  <div>
                    <dt className="sr-only">Address</dt>
                    <dd className="font-medium line-clamp-2 mt-2 dark:text-gray-200 break-words">
                      {restaurant?.restaurantName}
                    </dd>
                  </div>
                </dl>

                <div className="mt-3 flex items-center gap-8 text-xs">
                  <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                    <MapPin className="size-4 text-indigo-700 dark:text-indigo-400" />
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
                      <p className="text-gray-500 dark:text-gray-400">
                        Country
                      </p>
                      <p className="font-medium dark:text-gray-200">
                        {restaurant?.country}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 w-full flex justify-center items-center">
                <Link to={`/restaurant/${restaurant?._id}`}>
                  <ShimmerButton className="shadow-2xl py-2 bg-orange-400 dark:bg-orange-500">
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:text-gray-100 lg:text-xs">
                      View Menus
                    </span>
                  </ShimmerButton>
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>
          <h3 className=" my-10 text-center font-bold lg:text-2xl text-xl">
            No Restaurants Available
          </h3>
        </div>
      )}
    </div>
  );
};

export default RestaurantCard;
