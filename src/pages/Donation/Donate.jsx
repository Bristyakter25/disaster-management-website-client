import { useEffect, useState } from "react";
import donationImage from "../../assets/bannerImages/donate-image.jpg";
import { useNavigate } from "react-router-dom";

const Donate = () => {
  const [donations, setDonations] = useState([]);
    const navigate = useNavigate();
   useEffect(() => {
    fetch("https://disaster-management-website-server.onrender.com/alertPanel/donations")
      .then((res) => res.json())
      .then((data) => setDonations(data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  // const handleDonateClick = () => {
  //   navigate(`/alertPanel/donations/${disaster._id}`); // Navigate to details page
  // };
  return (
    <div className="">
      {/* Image with text overlay */}
      <div className="relative  overflow-hidden">
        <img
          src={donationImage}
          alt="Donate"
          className="w-full h-[410px] "
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl tracking-wider font-extrabold text-white mb-7">
            Your Help Matters
          </h1>
          <p className="text-lg font-semibold text-white lg:w-[550px] w-[350px]">
            Together we help victims of natural disasters in Bangladesh.
          </p>
          <p className="text-lg font-semibold mb-7 text-white max-w-md">
            100% of donations goes to the victims.
          </p>
          <p className="text-[15px] hover:underline-offset-2 hover:underline font-semibold text-white max-w-md">
            Learn More About Us
          </p>
        </div>
      </div>

     {/* Donation needed cards or data's */}

      <div className="grid my-10 max-w-5xl mx-auto md:grid-cols-2 lg:grid-cols-3 gap-6">
      {donations.map((disaster) => {
        const goal = disaster.donationGoal || 1; // prevent divide by 0
        const received = disaster.donationReceived || 0;
        const percentage = Math.min((received / goal) * 100, 100);

        return (
          <div
            key={disaster._id}
           
         
            className="bg-white dark:bg-slate-800 shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={disaster.image}
              alt={disaster.headline}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2  onClick={() => navigate(`/alertPanel/${disaster._id}`)} className="text-lg hover:underline hover:underline-offset-2 font-bold mb-2 dark:text-white">
                {disaster.headline}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                {disaster.description.slice(0, 100)}...
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <p className="text-lg font-bold mx-5 text-black dark:text-gray-300">
                ৳{received} / ৳{goal} ({Math.floor(percentage)}%)
              </p>
               <button
          onClick={() => navigate(`/alertPanel/donations/${disaster._id}`)}
          className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-indigo-600 dark:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-600 dark:hover:from-purple-700 dark:hover:to-indigo-600 transition-all duration-300"
        >
          Donate
        </button>
            </div>
          </div>
        );
      })}
    </div>

      
    </div>
  );
};

export default Donate;
