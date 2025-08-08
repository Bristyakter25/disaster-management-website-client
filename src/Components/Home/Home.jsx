
import Banner from './Banner';
import BlogPost from './BlogPost';

import CurrentDisasterZones from './CurrentDisasterZones';
import LatestHeadlines from './LatestHeadlines';
import MarqueeAlert from './MarqueeAlert';

const Home = () => {
    return (
       <div>
        <Banner></Banner>
       <div className='mx-8'>
         <MarqueeAlert></MarqueeAlert>
       </div>
         <div className='mx-8 '>
            
            <LatestHeadlines></LatestHeadlines>
            <CurrentDisasterZones></CurrentDisasterZones>
            
        </div>
        <BlogPost></BlogPost>
       </div>
    );
};

export default Home;