

import Banner from './Banner';
import BlogPost from './BlogPost';

import CurrentDisasterZones from './CurrentDisasterZones';
import FAQ from './FAQ';

import LatestHeadlines from './LatestHeadlines';
import MarqueeAlert from './MarqueeAlert';

const Home = () => {
    return (
       <div>
        <Banner></Banner>
       <div className='mx-8'>
         <MarqueeAlert></MarqueeAlert>
       </div>
        
           
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