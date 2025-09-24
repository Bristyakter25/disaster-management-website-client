

import Banner from './Banner';
import BannerCards from './BannerCards';
import BlogPost from './BlogPost';

import CurrentDisasterZones from './CurrentDisasterZones';
import FAQ from './FAQ';

import LatestHeadlines from './LatestHeadlines';
import MarqueeAlert from './MarqueeAlert';

const Home = () => {
    return (
       <div className='bg-[#ECF2FF] dark:bg-black'>
        <Banner></Banner>
       <div className='mx-8'>
         <MarqueeAlert></MarqueeAlert>
       </div>
       <BannerCards></BannerCards>
        
           
<LatestHeadlines></LatestHeadlines>

           
            
           <div className='mx-8'>
             <CurrentDisasterZones></CurrentDisasterZones>
           </div>
            
       
        <BlogPost></BlogPost>
<FAQ></FAQ>
        {/* <PaymentPage></PaymentPage> */}
       </div>
    );
};

export default Home;