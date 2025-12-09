import Aos from 'aos';
import Banner from './Banner';
import BannerCards from './BannerCards';
import BlogPost from './BlogPost';
import Contact from './ContactUs/Contact';
import CurrentDisasterZones from './CurrentDisasterZones';
import FAQ from './FAQ';
import LatestHeadlines from './LatestHeadlines';
import MarqueeAlert from './MarqueeAlert';
import { useEffect } from 'react';
import AboutUs from './AboutUs';

const Home = () => {
  useEffect(() => {
    Aos.refresh(); 
  }, []);
  
  return (
    <div className='bg-[#ECF2FF] dark:bg-black'>
      
      {/* Hero Banner */}
      
        <Banner />
     

      {/* Marquee Alerts */}
      <div className='mx-8' data-aos="fade-right">
        <MarqueeAlert />
      </div>

      {/* Banner Cards */}
      <div data-aos="zoom-in">
        <BannerCards />
      </div>

      {/* Latest Headlines */}
      <div data-aos="fade-up">
        <LatestHeadlines />
      </div>

      {/* Current Disaster Zones */}
      <div  data-aos="fade-up"  className='mx-8'>
        <CurrentDisasterZones />
      </div>

      {/* Blog Posts */}
      <div data-aos="zoom-in-up">
        <BlogPost />
      </div>

       <div data-aos="fade-up">
        <AboutUs></AboutUs>
      </div>

      {/* FAQ Section */}
      <div data-aos="fade-up">
        <FAQ />
      </div>
     

      {/* Contact Form */}
      <div data-aos="fade-up">
        <Contact />
      </div>

    </div>
  );
};

export default Home;
