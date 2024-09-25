import AboutSection from "./homeComponents/AboutSection";
import BlogSection from "./homeComponents/BlogSection";
import ContentSection from "./homeComponents/ContentSection";
import HeroSection from "./homeComponents/HeroSection";
import ServiceSection from "./homeComponents/ServiceSection";

const HomePage = () => {
  return (
    <div className=" w-full h-auto overflow-hidden">
      <HeroSection />
      <AboutSection />
      <ServiceSection />
      <ContentSection />
      <BlogSection />
    </div>
  );
};

export default HomePage;
