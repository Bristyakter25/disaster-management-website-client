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
        <div className="mb-5  w-full ">
          <Carousel
  autoPlay={true}
  infiniteLoop={true}
  interval={3000}          
  transitionTime={600}     
  showThumbs={false}       
  showStatus={false}       
  showArrows={true}        
>
<div className="relative lg:h-[640px] h-[400px] w-full">
  <img src={pic1} className="w-full h-full object-cover" alt="Disaster Preview 1" />
  <div className="absolute inset-0 flex items-center text-white bg-black bg-opacity-50">
    <div className="ml-10 lg:ml-20 max-w-2xl text-left space-y-4">
      <h2 className="text-2xl lg:text-5xl font-bold text-[#8DD8FF]">
        Disaster Management
      </h2>
      <p className="text-lg lg:text-xl">
        Timely action saves lives. Through preparation, coordination, and swift response, we mitigate the impact of natural and man-made disasters.
      </p>
      <p className="text-base lg:text-lg">
        Empower communities. Strengthen infrastructure. Foster resilience.
      </p>
    </div>
  </div>
</div>

<div className="relative lg:h-[640px] h-[400px] w-full">
  <div className="lg:h-[640px] h-[400px]">
    <img src={pic2} className="w-full h-full object-cover" alt="Disaster Preview 2" />
    <div className="absolute  inset-0 flex items-center text-white bg-black bg-opacity-50">
      <div className="ml-10 lg:ml-20 max-w-xl text-left space-y-4">
        <h2 className="text-3xl lg:text-5xl font-bold text-[#F97316]">
          After the Quake: Every Second Counts
        </h2>
        <p className="text-lg lg:text-xl">
          Rapid response is critical. Teams are deployed, lives are rescued, and infrastructure begins to recover.
        </p>
        <p className="text-base lg:text-lg">
          Search. Rescue. Rebuild. Together, we restore hope.
        </p>
      </div>
    </div>
  </div>
</div>

{/* Fire Extinguisher - Slide 3 */}
<div className="relative lg:h-[640px] h-[400px] w-full">
  <img src={pic3} className="w-full h-full" alt="Cyclone Emergency Response" />
  <div className="absolute inset-0 flex items-center text-white bg-black bg-opacity-50">
    <div className="ml-10 lg:ml-20 max-w-xl text-left space-y-4">
      <h2 className="text-3xl lg:text-5xl font-bold text-cyan-400">
        Battling the Storms
      </h2>
      <p className="text-lg lg:text-xl">
        Cyclone shelters, early warnings, and brave volunteers reduce loss of life.
      </p>
      <p className="text-base lg:text-lg">
        Coastal communities face the storm head-on with preparation and resilience.
      </p>
    </div>
  </div>
</div>


{/* Fire Rescue - Slide 4 */}
<div className="relative lg:h-[640px] h-[400px] w-full">
  <img src={pic4} className="w-full h-full" alt="River Erosion Crisis in Bangladesh" />
  <div className="absolute inset-0 flex items-center text-white bg-black bg-opacity-50">
    <div className="ml-10 lg:ml-20 max-w-xl text-left space-y-4">
      <h2 className="text-3xl lg:text-5xl font-bold text-[#FFFA8D]">
        Losing Land to the River
      </h2>
      <p className="text-lg lg:text-xl">
        Villages vanish overnight as mighty rivers erode banks relentlessly.
      </p>
      <p className="text-base lg:text-lg">
        Displaced families depend on rapid aid and long-term resettlement efforts.
      </p>
    </div>
  </div>
</div>


{/* Flood Response - Slide 5 */}
<div className="relative lg:h-[640px] h-[400px] w-full">
  <img src={pic5} className="w-full h-full object-cover" alt="Flood Emergency" />
  <div className="absolute inset-0 flex items-center text-white bg-black bg-opacity-50">
    <div className="ml-10 lg:ml-20 max-w-xl text-left space-y-4">
      <h2 className="text-3xl lg:text-5xl font-bold text-blue-400">
        Rising Waters, Rising Risks
      </h2>
      <p className="text-lg lg:text-xl">
        Floods can devastate communities—preparedness and early warning systems are vital.
      </p>
      <p className="text-base lg:text-lg">
        Monitor water levels. Evacuate safely. Rebuild stronger.
      </p>
    </div>
  </div>
</div>

{/* Flood Aftermath - Slide 6 */}
<div className="relative lg:h-[640px] h-[400px] w-full">
  <img src={pic6} className="w-full h-full object-cover" alt="Flood Recovery" />
  <div className="absolute inset-0 flex items-center text-white bg-black bg-opacity-50">
    <div className="ml-10 lg:ml-20 max-w-2xl text-left space-y-4">
      <h2 className="text-3xl lg:text-5xl font-bold text-blue-500">
        After the Flood: Recovery and Resilience
      </h2>
      <p className="text-lg lg:text-xl">
        Recovery starts with clean-up, relief distribution, and rebuilding homes and hope.
      </p>
      <p className="text-base lg:text-lg">
        Support displaced families. Strengthen future defenses. Unite for recovery.
      </p>
    </div>
  </div>
</div>


 
</Carousel>

        </div>
    );
};

export default Banner;