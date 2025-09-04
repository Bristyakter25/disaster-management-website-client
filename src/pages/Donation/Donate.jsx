import donationImage from "../../assets/bannerImages/donate-image.jpg";

const Donate = () => {
  return (
    <div className="mt-16 ">
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

      {/* Donation Form Below */}
      <div className="mt-6 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
        {/* Preset Amounts */}
        <div className="flex justify-center gap-4 mb-4">
          {[10, 25, 50, 100].map((amt) => (
            <button
              key={amt}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
            >
              ${amt}
            </button>
          ))}
          <input
            type="number"
            placeholder="Custom"
            className="w-20 px-2 py-2 border rounded-lg text-center"
          />
        </div>

        {/* Stripe Payment Button */}
        <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition">
          Donate Now
        </button>

        {/* Optional Impact Section */}
        <div className="mt-6 text-center text-gray-600 dark:text-gray-300">
          <p>Every dollar you donate provides immediate relief to families in need.</p>
        </div>
      </div>
    </div>
  );
};

export default Donate;
