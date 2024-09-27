import { AnimatedSubscribeButton } from "../magicui/animated-subscribe-button";
import { CheckIcon, ShoppingCartIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { useCartStore } from "@/store/useCartStore";

const AvailableMenus = ({ menus, loading }: any) => {
  const { addCartItem } = useCartStore();

  if (loading) {
    return (
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 my-3 items-center justify-center">
        {Array(menus?.length)
          .fill(0)
          .map((_, ind: number) => (
            <div key={ind} className="sm:w-[40%] md:w-[40%] lg:w-[30%] w-full">
              <div className="block rounded-md overflow-hidden shadow-sm bg-white shadow-indigo-100 hover:shadow-md transition-shadow">
                <Skeleton className="h-36 w-full" />
                <div className="p-3">
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-1/4 mb-2" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 my-3 justify-center">
      {menus?.length > 0 ? (
        menus?.map((menu: any) => (
          <div
            key={menu?._id}
            className="sm:w-[40%] md:w-[40%] lg:w-[30%] w-full p-3 bg-slate-100 dark:bg-gray-700 rounded-md shadow-indigo-100 hover:shadow-md transition-shadow"
          >
            <div className="">
              <img
                alt="image"
                src={menu?.image}
                className="h-36 w-full object-cover rounded-md"
              />
              <div className="p-3">
                <p className="text-gray-600 line-clamp-3 break-words font-semibold text-sm dark:text-white ">
                  {menu?.description}
                </p>
                <div className="mt-2">
                  <span className="font-bold text-gray-800 text-base dark:text-white">
                    Price :
                  </span>
                  <span className="px-2 text-orange-400 font-bold text-base dark:text-white">
                    {menu?.price} INR
                  </span>
                </div>

                <div
                  className="flex w-full justify-center mt-4"
                  onClick={() => addCartItem(menu)}
                >
                  <AnimatedSubscribeButton
                    buttonColor="#FF885B"
                    buttonTextColor="#ffff"
                    subscribeStatus={false}
                    initialText={
                      <span className="group flex items-center text-sm font-semibold ">
                        Add To Cart
                        <ShoppingCartIcon className="ml-2 h-4 w-4" />
                      </span>
                    }
                    changeText={
                      <span className="group inline-flex items-center text-sm font-semibold">
                        <CheckIcon className="mr-2 h-4 w-4" />
                        Added
                      </span>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>
          <h3 className=" my-10 font-bold text-2xl text-gray-400">
            menus not Available...
          </h3>
        </div>
      )}
    </div>
  );
};

export default AvailableMenus;
