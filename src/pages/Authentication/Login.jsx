import{ useContext } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { motion } from "framer-motion";
import loginAnimation from "../../assets/animations/Animation - 1736200967940.json"
import Lottie from 'lottie-react';
import Swal from 'sweetalert2';
const Login = () => {
    const {logInUser} = useContext(AuthContext);
    const navigate = useNavigate(); 
    const handleLogin = (e) => {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;

  logInUser(email, password)
    .then((result) => {
      console.log(result.user);

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: `Welcome back, ${result.user.displayName || 'User'}!`,
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/");
    })
    .catch((error) => {
      console.error('Login error:', error);

      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message || 'Something went wrong. Please try again.',
      });
    });
};

    return (
  <div>
    {/* Hero Section */}
    <div className="text-center dark:text-white py-36 px-4 bg-gradient-to-r from-white to-sky-200 dark:from-[#00072D] dark:to-[#001F54]">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">Log in Here!</h2>
      <div className="flex items-center justify-center gap-x-2 text-center text-base md:text-lg">
        <Link to="/" className="hover:text-blue-500">
          Home
        </Link>
        <FaLongArrowAltRight />
        <p>Log In</p>
      </div>
    </div>

    {/* Login Content Section */}
    <div className="flex flex-col-reverse md:flex-row items-center dark:bg-transparent dark:text-white mx-auto px-4 py-12 max-w-6xl">
      
      {/* Left: Animation */}
      <div className="w-full md:w-1/2 flex justify-center items-center mb-10 md:mb-0">
        <Lottie animationData={loginAnimation} loop={true} className="w-full max-w-md" />
      </div>

      {/* Right: Login Form */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 px-4 md:px-8 lg:px-12 space-y-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white">
          Welcome to ResQlink
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full dark:bg-gray-900 bg-white dark:text-white px-4 py-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full dark:bg-gray-900 bg-white  dark:text-white px-4 py-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-200 text-lg font-semibold"
          >
            Login
          </button>
        </form>

        <div className="flex items-center justify-between mt-6">
          <hr className="w-1/3 border-gray-300" />
          <span className="text-gray-400">or</span>
          <hr className="w-1/3 border-gray-300" />
        </div>

        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-sky-600 text-lg font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  </div>
);

};

export default Login;