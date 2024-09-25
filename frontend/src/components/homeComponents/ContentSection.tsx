import cheff from "../../assets/mid-shot-chef-holding-plate-with-pasta-making-ok-sign 1.png";
import sourcury from "../../assets/sour-curry-with-snakehead-fish-spicy-garden-hot-pot-thai-food 1.png";
import nonveg from "../../assets/sadj-iron-pot-with-various-salads 1.png";
import { Clock, LucideShoppingBag, LucideTags } from "lucide-react";

const ContentSection = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row py-10 px-4 sm:px-6 lg:px-8">
      {/* Image Section */}
      <div className="lg:w-[60%] flex gap-4 items-center justify-center mb-6 lg:mb-0">
        <div>
          <img
            src={cheff}
            alt="cheff"
            className="h-[40vh] w-[80vw] lg:h-[50vh] lg:w-[20vw] mb-4 lg:mb-8 object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-2">
          <img
            src={sourcury}
            alt="curry"
            className="w-[80vw] h-[25vh] lg:w-[15vw] lg:h-[25vh] object-cover rounded-lg mb-2"
          />
          <img
            src={nonveg}
            alt="nonveg"
            className="w-[80vw] h-[25vh] lg:w-[15vw] lg:h-[25vh] object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Text Section */}
      <div className="lg:w-[40%] flex flex-col justify-center mx-6 lg:mx-0">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Fastest Food <br /> Delivery in City
        </h3>
        <div className="my-3 flex flex-col gap-3">
          <div className="flex items-center gap-2 dark:text-gray-100 text-gray-900 font-semibold">
            <Clock size={20} className="text-red-600" />
            <span>Delivery within 30 minutes</span>
          </div>
          <div className="flex items-center gap-2 dark:text-gray-100 text-gray-900 font-semibold">
            <LucideTags size={20} className="text-red-600" />
            <span>Best Offer & Price</span>
          </div>
          <div className="flex items-center gap-2 dark:text-gray-100 text-gray-900 font-semibold">
            <LucideShoppingBag size={20} className="text-red-600" />
            <span>Online Service Available</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
