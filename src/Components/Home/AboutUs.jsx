import { ShieldCheck, HeartHandshake, Truck, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import img1 from "../../assets/images/rescue 1.jpeg";
import img2 from "../../assets/images/rescue 2.jpeg";
import img3 from "../../assets/images/rescue 3.jpg";
import img4 from "../../assets/images/rescue 4.jpg";

const AboutUs = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <ShieldCheck size={28} className="text-green-600" />,
      title: "Reliable",
      desc: "Trusted disaster response support",
    },
    {
      icon: <HeartHandshake size={28} className="text-blue-600" />,
      title: "Community Driven",
      desc: "Built for transparency & teamwork",
    },
    {
      icon: <Truck size={28} className="text-yellow-600" />,
      title: "Fast Allocation",
      desc: "Quick and accurate resource delivery",
    },
    {
      icon: <Eye size={28} className="text-purple-600" />,
      title: "Transparent",
      desc: "Clear, trackable operations",
    },
  ];

  return (
    <section className="w-full py-20">
<h2 className="text-3xl lg:text-5xl tracking-widest text-center mt-10  text-gray-800 font-anton dark:text-white mb-7">
            ABOUT US
          </h2>
          <p className="mt-2 mb-16 text-center tracking-wider text-lg text-gray-600 dark:text-gray-300">
    Empowering Communities to Build Resilience and Save Lives Everywhere
  </p>
      {/* Top Features */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {features.map((item, i) => (
          <div
            key={i}
            className="bg-white shadow-sm rounded-xl p-6 text-center border border-gray-100 
                       transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-purple-500"
          >
            <div className="flex justify-center mb-3">{item.icon}</div>
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Main About Section */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* 4-Image Grid with hover effects */}
        <div className="grid grid-cols-2 gap-4">
          {[img1, img2, img3, img4].map((img, index) => (
            <div key={index} className="overflow-hidden rounded-xl shadow relative group">
              <img
                src={img}
                alt={`grid-${index}`}
                className="rounded-xl object-cover h-48 w-full 
                           transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Text Section */}
        <div>
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Vision</h2>

          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            At ResQlink, our vision is to strengthen disaster preparedness and 
            response efficiency. We aim to build a transparent, fast, and 
            community-driven system that ensures critical resources reach the 
            right people at the right time. Through smart coordination and 
            real-time data sharing, we help communities stay safer and more resilient.
          </p>

          <Link to="/aboutUs"><button
            
            className="mt-4  px-10 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-indigo-600 dark:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-600 dark:hover:from-purple-700 dark:hover:to-indigo-600 transition-all duration-300"
          >
            Learn More
          </button></Link>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
