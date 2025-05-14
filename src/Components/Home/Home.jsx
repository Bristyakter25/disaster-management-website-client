import React from 'react';
import Banner from './Banner';
import LiveAlerts from './LiveAlerts';
import CurrentDisasterZones from './CurrentDisasterZones';

const Home = () => {
    return (
       <div>
        <Banner></Banner>
         <div className='lg:w-[1124px] w-[350px] mx-auto'>
            
            <LiveAlerts></LiveAlerts>
            <CurrentDisasterZones></CurrentDisasterZones>
        </div>
       </div>
    );
};

export default Home;