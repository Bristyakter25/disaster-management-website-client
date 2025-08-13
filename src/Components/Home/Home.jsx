
import { NeobrutalismFaq } from '../../../components/nurui/neobrutalism-faq';
import PaymentPage from '../Payment/PayementPage';
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
         <div className='mx-8 '>
            
            <LatestHeadlines></LatestHeadlines>
            <CurrentDisasterZones></CurrentDisasterZones>
            
        </div>
        <BlogPost></BlogPost>
        <NeobrutalismFaq></NeobrutalismFaq>
        <PaymentPage></PaymentPage>
       </div>
    );
};

export default Home;