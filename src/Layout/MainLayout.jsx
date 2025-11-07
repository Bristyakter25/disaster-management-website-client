import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Shared/Navbar.jsx/Navbar";
import Footer from "../Shared/Footer";
import InstallButton from "../Components/app/InstallButton";
 // <-- import it

const MainLayout = () => {
  const location = useLocation();
  const hideLayout = location.pathname.startsWith("/dashboard");

  return (
    <div>
      {!hideLayout && <Navbar />}

      <Outlet />

      {!hideLayout && <Footer />}

      {/* Show Install App button only on non-dashboard pages */}
      {!hideLayout && <InstallButton />}
    </div>
  );
};

export default MainLayout;
