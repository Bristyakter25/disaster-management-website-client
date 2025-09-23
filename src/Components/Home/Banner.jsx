import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import pic1 from '../../assets/bannerImages/banner-1.jpg';
import pic2 from '../../assets/bannerImages/banner-2.jpg';
import pic3 from '../../assets/bannerImages/banner-3.jpg';
import pic4 from '../../assets/bannerImages/banner-4.jpg';
import pic5 from '../../assets/bannerImages/banner-5.jpg';
import pic6 from '../../assets/bannerImages/banner-6.jpg';

const slides = [
  {
    image: pic1,
    title: "Disaster Management",
    titleColor: "#8DD8FF",
    subtitle: "Timely action saves lives. Through preparation, coordination, and swift response, we mitigate the impact of natural and man-made disasters.",
    description: "Empower communities. Strengthen infrastructure. Foster resilience."
  },
  {
    image: pic2,
    title: "After the Quake: Every Second Counts",
    titleColor: "#F97316",
    subtitle: "Rapid response is critical. Teams are deployed, lives are rescued, and infrastructure begins to recover.",
    description: "Search. Rescue. Rebuild. Together, we restore hope."
  },
  {
    image: pic3,
    title: "Battling the Storms",
    titleColor: "cyan",
    subtitle: "Cyclone shelters, early warnings, and brave volunteers reduce loss of life.",
    description: "Coastal communities face the storm head-on with preparation and resilience."
  },
  {
    image: pic4,
    title: "Losing Land to the River",
    titleColor: "#FFFA8D",
    subtitle: "Villages vanish overnight as mighty rivers erode banks relentlessly.",
    description: "Displaced families depend on rapid aid and long-term resettlement efforts."
  },
  {
    image: pic5,
    title: "Rising Waters, Rising Risks",
    titleColor: "#93DA97",
    subtitle: "Floods can devastate communities—preparedness and early warning systems are vital.",
    description: "Monitor water levels. Evacuate safely. Rebuild stronger."
  },
  {
    image: pic6,
    title: "After the Flood: Recovery and Resilience",
    titleColor: "#799EFF",
    subtitle: "Recovery starts with clean-up, relief distribution, and rebuilding homes and hope.",
    description: "Support displaced families. Strengthen future defenses. Unite for recovery."
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 5000); // change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mb-10 w-full lg:h-[640px] h-[400px] overflow-hidden">
      <AnimatePresence>
        {slides.map((slide, index) =>
          index === current && (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <motion.div
                className="absolute inset-0 flex items-center text-white bg-black/40"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 1 }}
              >
                <div className="ml-10 lg:ml-20 max-w-2xl space-y-4">
                  <h2
                    className="text-3xl lg:text-5xl font-bold"
                    style={{ color: slide.titleColor }}
                  >
                    {slide.title}
                  </h2>
                  <p className="text-lg lg:text-xl">{slide.subtitle}</p>
                  <p className="text-base lg:text-lg">{slide.description}</p>
                </div>
              </motion.div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
};

export default Banner;
