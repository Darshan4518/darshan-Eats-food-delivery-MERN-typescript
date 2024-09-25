import burger from "../../assets/pexels-andra-918581 1.png";
import pizza from "../../assets/pexels-katerina-holmes-5908226 1.png";
import chikkenpiece from "../../assets/pexels-leonardo-luz-13998974 1.png";
import cake from "../../assets/pexels-sebastian-coman-photography-3791088 1.png";
import chease from "../../assets/pexels-suzy-hazelwood-2966196 1.png";

const BlogSection = () => {
  const blogs = [
    {
      title:
        "The secret tips & tricks to prepare a perfect burger & pizza for our customers",
      date: "January 3, 2023",
      description:
        "Learn how to make the juiciest burgers and crispiest pizzas with our easy-to-follow tips. From choosing the right ingredients to mastering the cooking techniques, we’ve got you covered!",
      image: burger,
    },
    {
      title: "How to prepare the perfect french fries in an air fryer",
      date: "January 3, 2023",
      image: pizza,
    },
    {
      title: "How to prepare delicious chicken tenders",
      date: "January 3, 2023",
      image: chikkenpiece,
    },
    {
      title: "7 delicious cheesecake recipes you can prepare",
      date: "January 3, 2023",
      image: cake,
    },
    {
      title: "5 great pizza restaurants you should visit in this city",
      date: "January 3, 2023",
      image: chease,
    },
  ];

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Our Blog & Articles
        </h2>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 dark:bg-red-700 dark:hover:bg-red-800">
          Read All Articles
        </button>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
        <div className="rounded-lg overflow-hidden w-full lg:w-[40%] bg-white dark:bg-gray-700 shadow-md">
          <img
            src={blogs[0].image}
            alt={blogs[0].title}
            className="w-full h-72 object-cover"
          />
          <div className="p-6">
            <p className="text-gray-500 text-sm dark:text-gray-400">
              {blogs[0].date}
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-2 dark:text-gray-100">
              {blogs[0].title}
            </h3>
            <p className="text-gray-700 mt-2 dark:text-gray-300">
              {blogs[0].description}
            </p>
          </div>
        </div>
        <div className="w-full lg:w-[60%] grid grid-cols-1 sm:grid-cols-2 gap-5">
          {blogs.slice(1).map((blog, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-700"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  {blog.date}
                </p>
                <h3 className="text-lg font-semibold text-gray-900 mt-1 dark:text-gray-100">
                  {blog.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
