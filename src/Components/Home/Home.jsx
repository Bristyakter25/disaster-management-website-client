

import Banner from './Banner';
import BlogPost from './BlogPost';

import CurrentDisasterZones from './CurrentDisasterZones';
import FAQ from './FAQ';

import LatestHeadlines from './LatestHeadlines';
import MarqueeAlert from './MarqueeAlert';
import RightSideBar from './RightSideBar';

const Home = () => {
    return (
       <div>
        <Banner></Banner>
       <div className='mx-8'>
         <MarqueeAlert></MarqueeAlert>
       </div>
         <div className='mx-8 '>
            <div >
<LatestHeadlines></LatestHeadlines>
{/* <RightSideBar></RightSideBar> */}
            </div>
            
            <CurrentDisasterZones></CurrentDisasterZones>
            
        </div>
        <BlogPost></BlogPost>
<FAQ></FAQ>
        {/* <PaymentPage></PaymentPage> */}
       </div>
    );
};

export default Home;