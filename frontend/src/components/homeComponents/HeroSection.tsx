import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import TypingAnimation from "../magicui/typing-animation";
import { useEffect, useState } from "react";
import { ConfettiFireworks } from "../animations/ConfettiFireworks";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/bg .png";

const HeroSection = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    ConfettiFireworks();
  }, []);

  const searchHandler = () => {
    if (value.trim()) {
      navigate(`/search/${value}`);
    }
  };

  return (
    <section
      className={`relative  flex items-center h-[91vh] mx-auto p-6 md:p-10 w-full bg-cover`}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex  w-full">
        <div className="text-center lg:text-left flex-1">
          <TypingAnimation
            text="Food Order Anytime & Anywhere"
            className="sm:text-5xl font-bold leading-tight text-gray-800 "
          />

          <p className="text-sm sm:text-lg lg:text-xl mt-4 max-w-md sm:max-w-lg lg:max-w-2xl mx-auto text-gray-700 ">
            Get your favorite meals delivered to your door, whenever you want!
          </p>

          <div className=" flex justify-center w-full">
            <div className="relative flex items-center  gap-x-3 max-w-xl my-5 p-3 w-full xl:mx-0 ">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
              <Input
                className="pl-10 w-full ring-0  bg-gray-100 text-gray-700 dark:bg-gray-100  placeholder:text-gray-500 dark:placeholder:text-gray-500 border border-gray-600 focus:border-none"
                placeholder="Search for restuarant and city and country"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Button
                className="ml-3 bg-green-500 hover:bg-green-400 dark:bg-green-600 dark:hover:bg-green-500 text-white"
                variant={"outline"}
                onClick={searchHandler}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
