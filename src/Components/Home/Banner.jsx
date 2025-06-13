import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import pic1 from '../../assets/bannerImages/banner-1.jpg';
import pic2 from '../../assets/bannerImages/banner-2.jpg';
import pic3 from '../../assets/bannerImages/banner-3.jpg';
import pic4 from '../../assets/bannerImages/banner-4.jpg';
import pic5 from '../../assets/bannerImages/banner-5.jpg';
import pic6 from '../../assets/bannerImages/banner-6.jpg';


const Banner = () => {
    return (
        <div className="mb-10  w-full ">
          <Carousel
  autoPlay={true}
  infiniteLoop={true}
  interval={3000}          
  transitionTime={600}     
  showThumbs={false}       
  showStatus={false}       
  showArrows={true}        
>
  <div className="relative lg:h-[750px] h-[400px] w-full">
  <img src={pic1} className="w-full h-full object-cover" alt="Disaster Preview 1" />
  <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-40">
    <h2 className="text-3xl lg:text-5xl font-bold mb-2">Disaster Management</h2>
    <p className="text-lg lg:text-xl">Act fast. Save lives. Build resilience.</p>
  </div>
</div>
<div className="relative lg:h-[750px] h-[400px] w-full">
  <div className="lg:h-[750px] h-[400px]">
    <img src={pic2} className="w-full h-full " alt="Disaster Preview 2" />
    <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-40">
    <h2 className="text-3xl lg:text-5xl font-bold mb-2">After the Quake: Every Second Counts</h2>
<p className="text-lg lg:text-xl">Search. Rescue. Rebuild. We stand strong together.</p>

    </div>
  </div>
  </div>
  <div className="lg:h-[750px] h-[400px]">
    <img src={pic3} className="w-full h-full " alt="Disaster Preview 3" />
  </div>
  <div className="lg:h-[750px] h-[400px]">
    <img src={pic4} className="w-full h-full " alt="Disaster Preview 4" />
  </div>
  <div className="lg:h-[750px] h-[400px]">
    <img src={pic5} className="w-full h-full " alt="Disaster Preview 5" />
  </div>
  <div className="lg:h-[750px] h-[400px]">
    <img src={pic6} className="w-full h-full" alt="Disaster Preview 6" />
  </div>
</Carousel>

        </div>
    );
};

export default Banner;