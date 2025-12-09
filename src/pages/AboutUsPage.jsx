import { FaLongArrowAltRight } from "react-icons/fa";
import image from "../assets/images/rescue 2.jpeg";
import { Link } from "react-router-dom";
import image1 from "../assets/images/rescue 1.jpeg"
import image2 from "../assets/images/rescue 2.jpeg"
import image3 from "../assets/images/rescue 3.jpg"
import image4 from "../assets/images/rescue 4.jpg"

const AboutUsPage = () => {
  return (
    <div>
      {/* Banner Section */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt="ResQlink Banner"
          className="w-full h-[450px] object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl tracking-wider font-extrabold text-white mb-3">
            About <span className="text-cyan-400">Us</span>
          </h1>
          <p className="text-xl mb-12 font-bold text-center text-white drop-shadow-md">
    Empowering Communities to Build Resilience and Save Lives Everywhere
  </p>

          <div className="flex items-center justify-center gap-x-2 text-center text-base md:text-lg">
        <Link to="/" className="hover:text-cyan-400 text-white">
          Home
        </Link>
        <p className="text-white"><FaLongArrowAltRight /></p>
        <p className="text-white">About Us</p>
      </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-8 text-center">
          Our Mission
        </h2>

        <p className="text-gray-700 text-lg sm:text-xl leading-relaxed mb-12 text-center max-w-3xl mx-auto">
          ResQlink aims to reduce disaster impact through rapid coordination,
          intelligent resource allocation, and community-driven transparency.
          We connect volunteers, responders, and local authorities on a single
          platform to ensure that no help arrives late and no resource is wasted.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-8 bg-gradient-to-br from-yellow-50 to-white shadow-lg rounded-2xl hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
            <h3 className="font-bold text-2xl mb-3 text-gray-800">Fast Response</h3>
            <p className="text-gray-600">
              Real-time tools that reduce delays during emergencies.
            </p>
          </div>

          <div className="p-8 bg-gradient-to-br from-yellow-50 to-white shadow-lg rounded-2xl hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
            <h3 className="font-bold text-2xl mb-3 text-gray-800">Resource Transparency</h3>
            <p className="text-gray-600">
              Track supply routes, usage, and delivery progress clearly.
            </p>
          </div>

          <div className="p-8 bg-gradient-to-br from-yellow-50 to-white shadow-lg rounded-2xl hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
            <h3 className="font-bold text-2xl mb-3 text-gray-800">Community First</h3>
            <p className="text-gray-600">
              Built to empower volunteers and strengthen local resilience.
            </p>
          </div>
        </div>
      </div>
     <div className="max-w-6xl mt-8 mb-14  mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
     
             {/* 4-Image Grid with hover effects */}
             <div className="grid grid-cols-2 gap-4">
               {[image1, image2, image3, image4].map((img, index) => (
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
     
               
             </div>
     
           </div>
    </div>
  );
};

export default AboutUsPage;
