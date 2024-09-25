import partyImage from "../../assets/kebab-set-table 1.png";
import weddingImage from "../../assets/happy-man-wife-sunny-day 1.png";
import eventImage from "../../assets/group-friends-eating-restaurant 1.png";
import birthDayImage from "../../assets/charming-female-blowing-candles-birthday-cake-after-making-her-wish-party 1.png";

type Services = {
  title: string;
  description: string;
  imgSrc: string;
}[];

const ServiceSection = () => {
  const services: Services = [
    {
      title: "Caterings",
      description: "Professional catering services for all your event needs.",
      imgSrc: partyImage,
    },
    {
      title: "Birthdays",
      description: "Celebrate birthdays with our delicious food options.",
      imgSrc: birthDayImage,
    },
    {
      title: "Weddings",
      description: "Exceptional wedding catering services for your big day.",
      imgSrc: weddingImage,
    },
    {
      title: "Corporate Events",
      description: "Perfect meals to enhance your corporate gatherings.",
      imgSrc: eventImage,
    },
  ];
  return (
    <div className=" max-w-7xl mx-auto my-3">
      <h3 className="text-2xl font-bold  my-6 pt-5 dark:text-white">
        We Also Deliver for Your Events
      </h3>
      <div className=" flex items-center justify-evenly flex-wrap gap-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="w-full sm:w-[45%] md:w-[30%] lg:w-[20%] p-4 bg-white dark:bg-gray-600 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={service.imgSrc}
              alt={service.title}
              className="w-full h-40 object-cover rounded-t-md mb-2"
            />
            <h4 className="text-lg font-semibold mb-1 dark:text-white">
              {service.title}
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSection;
