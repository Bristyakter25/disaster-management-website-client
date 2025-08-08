import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <div>
            <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
  <aside>
     <img src="src/assets/logo/logo.jpg " hight="40"  width="30" ></img>
    <p>
      ResQlink
      <br />
      Providing reliable tech since 2025
    </p> 
  </aside>
  <nav>
    <h6 className="footer-title">EXPLORE</h6>
    
    <Link to="/"><p>Home</p></Link>
    <Link to="/dashboard">Dashboard</Link>
  </nav>
  <nav>
    <h6 className="footer-title">ABOUT Us</h6>
    <Link to="/addAlertPanels"><p>All Alertpanel </p></Link>
     <a className="link link-hover">FAQs</a>
     
    </nav>
  <nav>
    <h6 className="footer-title">LOGIN PROCESS</h6>
     <Link to="/login">Login</Link>
     <Link to="/register">Register</Link>
    </nav>
</footer>
        </div>
    );
};

export default Footer;