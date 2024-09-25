import { Locate, Mail, Phone } from "lucide-react";
import aboutImage from "../../assets/aboutImage.png";
import { Button } from "../ui/button";

const AboutSection = () => {
  return (
    <div
      className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start my-10 px-4"
      id="about"
    >
      {/* Image Section */}
      <div className="relative w-full lg:w-[40%] mb-6 lg:mb-0 flex justify-center lg:justify-start">
        <img
          src={aboutImage}
          alt="image"
          className="h-auto w-[80%] lg:w-[25vw] rounded-md object-cover"
        />
        <div className="bg-gray-700 w-[80%] sm:w-[60%] lg:w-[20vw] h-auto absolute -bottom-5 -right-5 rounded-md p-4 transform lg:translate-x-0 lg:translate-y-0 shadow-lg dark:bg-white ">
          <h2 className="text-white font-bold text-lg mb-3 dark:text-gray-800">
            Come to visit us
          </h2>
          <div className="text-white flex items-center text-sm gap-x-2 mb-2  dark:text-gray-800">
            <Phone size={16} />
            <span>6362058989</span>
          </div>
          <div className="text-white flex items-center text-sm gap-x-2 mb-2  dark:text-gray-800">
            <Mail size={16} />
            <span>codewithdarshan45@gmail.com</span>
          </div>
          <div className="text-white flex items-center text-sm gap-x-2  dark:text-gray-800">
            <Locate size={16} />
            <span>Kanakapura, Ramanagara, Karnataka, India</span>
          </div>
        </div>
      </div>
      {/* Content Section */}
      <div className="w-full lg:w-[60%] px-4 lg:px-10">
        <h2 className="text-2xl lg:text-3xl font-bold mb-4  dark:text-white">
          We Provide Fast and Delicious Food Delivery
        </h2>
        <p className="text-gray-600 text-sm lg:text-base leading-relaxed dark:text-white">
          Welcome to our food delivery platform! Based in Kanakapura, Karnataka,
          we bring you a variety of mouth-watering dishes right to your
          doorstep. Whether you're craving a quick snack or a hearty meal, we've
          got you covered. Our dedicated team ensures that every order is
          delivered fresh, hot, and on time. Experience the convenience of
          enjoying your favorite meals from the comfort of your home. Feel free
          to explore our menu and place your order today!
        </p>
        <Button
          variant={"outline"}
          className=" my-5 rounded-full border border-gray-700 dark:border-white/90  dark:text-gay-800 dark:bg-white/90"
        >
          About us
        </Button>
      </div>
    </div>
  );
};

export default AboutSection;
