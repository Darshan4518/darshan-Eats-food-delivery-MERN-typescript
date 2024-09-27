import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { FormEvent, useEffect, useState } from "react";
import { useRestaurantStore } from "@/store/useRestaurantStore";

const FilterSection = () => {
  const { allRestaurants, getAllRestaurants } = useRestaurantStore();
  const [cuisineList, setCuisineList] = useState<string[]>([]);

  const {
    appliedCuisinesFilter,
    filterByCuisines,
    resetAppliedCuisinesFilter,
  } = useRestaurantStore();

  const handleCheck = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    appliedCuisinesFilter(value);
  };

  useEffect(() => {
    if (allRestaurants.length > 0) {
      const allCuisines = allRestaurants.flatMap((item: any) => item.cuisines);
      const uniqueCuisines = Array.from(new Set(allCuisines));
      setCuisineList(uniqueCuisines);
    }
  }, [allRestaurants]);

  useEffect(() => {
    getAllRestaurants();
  }, []);

  return (
    <div className="space-y-2">
      <div className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <header className="flex items-center justify-between p-2">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {filterByCuisines.length} Selected
          </span>
          <Button
            variant="outline"
            className="text-sm text-gray-900 underline underline-offset-4 dark:text-gray-100"
            onClick={() => {
              resetAppliedCuisinesFilter();
            }}
          >
            Reset
          </Button>
        </header>

        <ul className="space-y-1 border-t border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800">
          {cuisineList.length > 0 ? (
            cuisineList.map((cuisine, index) => (
              <li key={index}>
                <Label
                  htmlFor={`Filter${cuisine}`}
                  className="inline-flex items-center gap-2"
                >
                  <Input
                    type="checkbox"
                    id={`Filter${cuisine}`}
                    value={cuisine}
                    className="size-5 rounded border-gray-300 dark:border-gray-700"
                    onChange={handleCheck}
                    checked={filterByCuisines.includes(cuisine)}
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {cuisine}
                  </span>
                </Label>
              </li>
            ))
          ) : (
            <li>No cuisines available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default FilterSection;
