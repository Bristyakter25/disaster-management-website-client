import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper/modules";

const LatestHeadlines = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://disaster-management-website-server.vercel.app/latestAlerts")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setAlerts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load alerts.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading disaster alerts...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="px-4 md:px-10">
      <h2 className="text-3xl lg:text-5xl tracking-widest text-center mt-28  text-gray-800 font-anton dark:text-white mb-2">LATEST HEADLINES</h2>
      <p className="text-center dark:text-white mb-24 text-gray-700 tracking-wider text-lg">Get real-time information and safety tips for ongoing disasters.</p>

      {alerts.length > 0 ? (
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={25}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 25 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
        >
          {alerts.map((alert) => (
            <SwiperSlide key={alert._id} className="flex justify-center">
              <div
                className="rounded-xl shadow-lg cursor-pointer bg-white overflow-hidden transform transition-all duration-500 hover:shadow-[0_8px_25px_#7dd3fc] hover:-translate-y-1 hover:scale-105 w-full max-w-xs"
                onClick={() => navigate(`/latestAlerts/${alert._id}`)}
              >
                <div className="overflow-hidden rounded-t-xl">
                  <img
                    src={alert.image}
                    alt={alert.type}
                    className="w-full h-56 md:h-60 object-cover transform transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/300x200";
                    }}
                  />
                </div>
                <div className="flex py-3 px-4 justify-between items-center">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">{alert.type}</h3>
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm font-medium">
                    {alert.location}
                  </span>
                </div>
                <p className="my-4 px-4 text-md md:text-lg font-bold text-gray-700 hover:underline">
                  {alert.details}
                </p>
                <div className="px-4 pb-4 text-gray-600 text-sm space-y-1">
                  <p><strong>Severity:</strong> {alert.severity}</p>
                  <p><strong>Year:</strong> {alert.year}</p>
                  <p><strong>Time:</strong> {new Date(alert.timestamp).toLocaleString()}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-gray-500">No alerts available</p>
      )}
    </div>
  );
};

export default LatestHeadlines;
