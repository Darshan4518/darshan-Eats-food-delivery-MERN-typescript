import { useParams } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import FilterSection from "./restaurantsComponents/FilterSection";
import RestaurantCard from "./restaurantsComponents/RestaurantCard";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRestaurantStore } from "@/store/useRestaurantStore";

const Restaurants = () => {
  const { searchkey } = useParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { getSearchRestaurant, filterByCuisines, restaurants } =
    useRestaurantStore();

  useEffect(() => {
    if (searchkey) {
      getSearchRestaurant(searchkey, searchQuery, filterByCuisines);
    }
  }, [searchkey, getSearchRestaurant, searchQuery, filterByCuisines]);

  const solid = true;
  return (
    <div className=" dark:bg-gray-900 dark:text-gray-100 w-full h-auto">
      <div className="max-w-7xl mx-auto py-3 px-4">
        <div className="flex flex-col gap-y-6 lg:flex-row xl:gap-x-4 w-full">
          {/* Filter Section */}
          <div className="lg:w-[25%]">
            <h3 className="pb-3 text-gray-600 font-semibold dark:text-gray-300">
              Filter by Cuisines
            </h3>
            <FilterSection />
          </div>

          {/* Search Section */}
          <div className="lg:max-w-[70%] mx-auto w-full">
            <form className="flex flex-col sm:flex-row items-center gap-y-4 sm:gap-x-5">
              <Input
                placeholder="Search restaurants and cuisines..."
                className="w-full focus-visible:ring-1 h-12 dark:bg-gray-700 dark:text-gray-100"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
              <Button variant="outline" className="w-full sm:w-auto">
                Search
              </Button>
            </form>

            {/* Search Results */}
            <div className="my-5 flex flex-col gap-y-4 xl:flex-row  xl:gap-x-4 md:px-5 w-full">
              <h3 className="text-sm font-medium xl:w-[20%] ">
                ({restaurants?.length}) Search results found
              </h3>
              <div className="gap-3 flex flex-wrap">
                {filterByCuisines?.map((item: string, ind: number) => {
                  return (
                    <div
                      className={`inline-flex items-center justify-center rounded-full px-2.5 py-1 ${
                        solid
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-600 dark:text-purple-100"
                          : "border border-purple-500 text-purple-700 dark:border-purple-400 dark:text-purple-300"
                      }`}
                      key={ind}
                    >
                      <p className="whitespace-nowrap text-sm font-semibold">
                        {item}
                      </p>

                      <span className="-me-1 ms-1.5 bg-purple-200 hover:bg-purple-300 dark:bg-purple-700 dark:hover:bg-purple-600 p-0.5  rounded-full dark:text-white ">
                        <X size={14} />
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <RestaurantCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
