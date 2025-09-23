import { useEffect, useState } from "react";
import { Phone, HeartHandshake, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import WeatherWidget from "./weatherWidget";

const tips = [
  "Keep an emergency kit with food, water, and first aid.",
  "Charge your phone and power bank before storms.",
  "Know the nearest shelter in your area.",
  "Store important documents in waterproof bags.",
  "Stay indoors during lightning and strong winds.",
];

const RightSideBar = () => {
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full md:w-80 p-4 space-y-6">
      {/* Disaster Tip Card */}
      <motion.div
        className="bg-gradient-to-r from-red-100 to-red-50 p-5 rounded-3xl shadow-lg hover:scale-105 transition-transform duration-300"
      >
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="text-red-600" size={24} />
          <h2 className="text-lg font-bold text-gray-800">Disaster Tip</h2>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={currentTip}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-gray-700 italic"
          >
            “{tips[currentTip]}”
          </motion.p>
        </AnimatePresence>
      </motion.div>

      {/* Emergency Contacts */}
      <div className="bg-white border p-5 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center gap-2 mb-3">
          <Phone className="text-blue-600" size={24} />
          <h2 className="text-lg font-bold text-gray-800">Emergency Contacts</h2>
        </div>
        <ul className="text-gray-700 space-y-1">
          <li>🚓 Police: <span className="font-medium">999</span></li>
          <li>🚒 Fire Service: <span className="font-medium">102</span></li>
          <li>🏥 Ambulance: <span className="font-medium">106</span></li>
          <li>📞 Disaster Helpline: <span className="font-medium">1090</span></li>
        </ul>
      </div>

      {/* Donation / Volunteer CTA */}
      <div className="bg-gradient-to-r from-green-100 to-green-50 p-5 rounded-3xl shadow-lg text-center hover:scale-105 transition-transform duration-300">
        <div className="flex justify-center mb-3">
          <HeartHandshake className="text-green-600" size={30} />
        </div>
        <h2 className="text-lg font-bold text-gray-800 mb-2">Support Victims</h2>
        <p className="text-gray-700 mb-4">Help affected families recover from disasters.</p>
        <button className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 transition">
          Donate Now
        </button>
      </div>
      <WeatherWidget></WeatherWidget>
    </div>
  );
};

export default RightSideBar;
