import { Facebook, Instagram, Twitter, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-400">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 ">
        <div className="flex justify-center text-teal-600 dark:text-teal-400">
          Darshan Eats
        </div>

        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 dark:text-gray-400">
          "Experience the taste of happiness delivered to your doorstep. At
          Darshan Eats, we bring your favorite meals fresh and fast, right to
          where you are."
        </p>

        <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          {["About", "Home", "Blog", "Service", "Content"].map((item) => (
            <li key={item}>
              <Link
                className="text-gray-700 dark:text-gray-300 transition hover:text-gray-700/75 dark:hover:text-gray-300/75"
                to="#"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="mt-12 flex justify-center gap-6 md:gap-8">
          <li>
            <a
              href="#"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 dark:text-gray-300 transition hover:text-gray-700/75 dark:hover:text-gray-300/75"
            >
              <Facebook className="w-6 h-6" />
              <span className="sr-only">Facebook</span>
            </a>
          </li>

          <li>
            <a
              href="#"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 dark:text-gray-300 transition hover:text-gray-700/75 dark:hover:text-gray-300/75"
            >
              <Instagram className="w-6 h-6" />
              <span className="sr-only">Instagram</span>
            </a>
          </li>

          <li>
            <a
              href="https://x.com/codewithdarshu"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 dark:text-gray-300 transition hover:text-gray-700/75 dark:hover:text-gray-300/75"
            >
              <Twitter className="w-6 h-6" />
              <span className="sr-only">Twitter</span>
            </a>
          </li>

          <li>
            <a
              href="https://github.com/Darshan4518"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 dark:text-gray-300 transition hover:text-gray-700/75 dark:hover:text-gray-300/75"
            >
              <Github className="w-6 h-6" />
              <span className="sr-only">GitHub</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
