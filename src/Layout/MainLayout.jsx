
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Shared/Navbar.jsx/Navbar';
import Footer from '../Shared/Footer';

const MainLayout = () => {
    const location = useLocation();
    const hideLayout = location.pathname.startsWith('/dashboard');

    return (
        <div>
            {!hideLayout && <Navbar />}
            <Outlet />
            {!hideLayout && <Footer />}
        </div>
    );
};

export default MainLayout;
