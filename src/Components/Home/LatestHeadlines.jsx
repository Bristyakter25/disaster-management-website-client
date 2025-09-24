import { useEffect, useState, useRef } from "react";
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

  const prevRef = useRef(null);
  const nextRef = useRef(null);

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
    <div className="px-4 md:px-10 ">
      <h2 className="text-3xl lg:text-5xl tracking-widest text-center mt-28 text-gray-800 font-anton dark:text-white mb-2">
        LATEST HEADLINES
      </h2>
      <p className="text-center dark:text-white mb-16 text-gray-700 tracking-wider text-lg">
        Get real-time information and safety tips for ongoing disasters.
      </p>

      <div className="relative flex items-center justify-center max-w-6xl mx-auto">
        {/* Left Arrow: Negative left so it's outside the Swiper cards */}
        {/* Left Arrow */}
<button
  ref={prevRef}
  className="
    absolute top-1/2 -translate-y-1/2 
    left-2 sm:left-4 md:-left-10 lg:-left-16
    z-10 
    bg-blue-100 hover:bg-blue-300 text-blue-700 
    font-bold 
    py-2 px-3 sm:py-3 sm:px-4 
    rounded-full shadow transition
  "
  aria-label="Previous"
>
  &larr;
</button>

{/* Right Arrow */}
<button
  ref={nextRef}
  className="
    absolute top-1/2 -translate-y-1/2 
    right-2 sm:right-4 md:-right-10 lg:-right-4
    z-10 
    bg-blue-100 hover:bg-blue-300 text-blue-700 
    font-bold 
    py-2 px-3 sm:py-3 sm:px-4 
    rounded-full shadow transition
  "
  aria-label="Next"
>
  &rarr;
</button>


        <div className="w-full ">
          {alerts.length > 0 ? (
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={25}
              slidesPerView={1}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              breakpoints={{
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
            >
              {alerts.map((alert) => (
                <SwiperSlide key={alert._id} className="flex justify-center">
                  <div
                    className="rounded-xl  shadow-lg cursor-pointer bg-white overflow-hidden transform transition-all duration-500 hover:shadow-[0_8px_25px_#7dd3fc] hover:-translate-y-1 hover:scale-105 w-full max-w-xs"
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
                    <p className="my-4 lg:h-[90px] h-[120px] px-4 text-md md:text-lg font-bold text-black hover:underline">
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
      </div>
    </div>
  );
};

export default LatestHeadlines;