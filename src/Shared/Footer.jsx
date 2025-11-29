import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <div>
            <footer className="footer sm:footer-horizontal bg-sky-100 dark:bg-[#191825] text-base-content p-10">
  <aside className="text-black dark:text-white">
     <img src="src/assets/logo/logo.jpg " hight="40"  width="30" ></img>
    <p>
      ResQlink
      <br />
      Providing reliable tech since 2025
    </p> 
  </aside>
  <nav className="text-black dark:text-white">
    <h6 className="footer-title text-black dark:text-white">EXPLORE</h6>
    
    <Link to="/"><p >Home</p></Link>
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/donateUs">Donate</Link>
    <Link to="/requestHelps">Help Request</Link>
  </nav>
  <nav className="text-black dark:text-white">
    <h6 className="footer-title">ABOUT Us</h6>
    <Link to="/addAlertPanels"><p>All Alertpanel </p></Link>
    <Link to="/contactForm"><p>Contact Us </p></Link>
     <Link to="/dashboard/rescuerProfile"><p>Be a Rescue Member </p></Link>
     <a href="#faq" className="link link-hover">FAQs</a>
     
    </nav>
  <nav className="text-black dark:text-white">
    <h6 className="footer-title">LOGIN PROCESS</h6>
     <Link to="/login">Login</Link>
     <Link to="/register">Register</Link>
    </nav>
</footer>
        </div>
    );
};

export default Footer;