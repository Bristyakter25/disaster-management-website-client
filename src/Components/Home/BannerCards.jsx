import img1 from "../../assets/bannerImages/hands-2847508_1280.jpg";
import img2 from "../../assets/bannerImages/man-9383629_1280.jpg";

const BannerCards = () => {
  const cards = [
    {
      img: img2,
      heading: "SEND DONATION",
      subHeading:
        "Your support can provide essential aid, shelter, and resources to communities affected by disasters, helping them recover and rebuild their lives.",
      link: "/donateUs",
      overlayColor: "bg-red-500/60",
      buttonText: "Donate Now",
    },
    {
      img: img1,
      heading: "GET INVOLVED",
      subHeading:
        "Join hands with rescue teams and volunteers to deliver immediate relief, save lives, and make a tangible difference during emergencies.",
      link: "/dashboard/rescuerProfile",
      overlayColor: "bg-blue-500/60",
      buttonText: "Join Now",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-10 py-10 lg:px-3">
      {cards.map((card, index) => (
        <div
          key={index}
          className="relative rounded-xl overflow-hidden shadow-lg h-80 md:h-96 flex items-center justify-center group"
        >
          {/* Background Image */}
          <img
            src={card.img}
            alt={card.heading}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Color Overlay */}
          <div className={`absolute inset-0 ${card.overlayColor} transition duration-500 group-hover:bg-opacity-70`}></div>

          {/* Centered Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">
              {card.heading}
            </h2>
            <p className="text-white font-semibold text-md md:text-lg mb-6">
              {card.subHeading}
            </p>
            <a
              href={card.link}
              className="font-extrabold underline underline-offset-2 hover:text-[#00FFDE] text-white text-lg tracking-wide"
            >
              {card.buttonText}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BannerCards;
