
import Banner from './Banner';

import CurrentDisasterZones from './CurrentDisasterZones';
import LatestHeadlines from './LatestHeadlines';

const Home = () => {
    return (
       <div>
        <Banner></Banner>
         <div className='lg:w-[1124px] w-[350px] mx-auto'>
            
            <LatestHeadlines></LatestHeadlines>
            <CurrentDisasterZones></CurrentDisasterZones>
        </div>
       </div>
    );
};

export default Home;