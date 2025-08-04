
import Banner from './Banner';

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
         <div className='mx-8 lg:flex gap-x-5'>
            
            <LatestHeadlines></LatestHeadlines>
            <CurrentDisasterZones></CurrentDisasterZones>
            
        </div>
       </div>
    );
};

export default Home;