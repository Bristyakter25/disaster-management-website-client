import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { auth } from '../../firebase/firebase.init';
import Lottie from 'lottie-react';
import registerAnimation from '../../assets/animations/Animation - 1736887706875.json'; // use your actual animation path
import { motion } from 'framer-motion';
import { FaLongArrowAltRight } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;
  const name = e.target.name.value;
  const photo = e.target.photo.value;
  const role = e.target.role.value;

  createUser(email, password)
    .then((result) => {
      const loggedUser = result.user;

      updateUserProfile(name, photo)
        .then(() => {
          loggedUser.reload().then(() => {
            const refreshedUser = auth.currentUser;
            const newUser = {
              name: refreshedUser.displayName,
              email: refreshedUser.email,
              photo: refreshedUser.photoURL,
              role
            };

            fetch('https://disaster-management-website-server.onrender.com/users', {
              method: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify(newUser)
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: 'Your account has been created successfully!',
                    timer: 2000,
                    showConfirmButton: false
                  });
                  navigate('/');
                }
              });
          });
        })
        .catch((error) => {
          console.error('Error updating profile:', error);
          Swal.fire({
            icon: 'error',
            title: 'Profile Update Failed',
            text: error.message || 'Could not update user profile.'
          });
        });
    })
    .catch((error) => {
      console.error('Registration error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.message || 'Could not create user.'
      });
    });
};

 return (
  <div>
    {/* Top Section (Hero) */}
    <div className="text-center dark:text-white py-36 px-4 bg-gradient-to-r from-white to-sky-200 dark:from-[#00072D] dark:to-[#001F54]">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">Register Here!</h2>
      <div className="flex items-center justify-center gap-x-2 text-center text-base md:text-lg">
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <FaLongArrowAltRight />
        <p>Register</p>
      </div>
    </div>

    {/* Registration Content */}
    <div className="flex flex-col-reverse md:flex-row items-center dark:bg-transparent dark:text-white mx-auto px-4 py-12 max-w-6xl">

      {/* Left Side Animation */}
      <div className="w-full md:w-1/2 flex justify-center items-center mb-10 md:mb-0">
        <Lottie animationData={registerAnimation} loop={true} className="w-full max-w-md" />
      </div>

      {/* Right Side Form */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 px-4 md:px-8 lg:px-12 space-y-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white">
          Register to ResQlink
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Name</label>
            <input type="text" name="name" placeholder="Name" required
              className="w-full dark:bg-gray-900 bg-white dark:text-white px-4 py-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Email</label>
            <input type="email" name="email" placeholder="Email" required
              className="w-full dark:bg-gray-900 bg-white dark:text-white px-4 py-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Photo URL</label>
            <input type="url" name="photo" placeholder="Photo URL" required
              className="w-full dark:bg-gray-900 bg-white dark:text-white px-4 py-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Password</label>
            <input type="password" name="password" placeholder="Password" required
              className="w-full dark:bg-gray-900 bg-white dark:text-white px-4 py-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Role</label>
            <select name="role" required
              className="w-full dark:bg-gray-900 bg-white dark:text-white px-4 py-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Citizen">Citizen</option>
              <option value="Rescue Member">Rescue Member</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-all duration-200 text-lg font-semibold"
          >
            Register
          </button>
        </form>

        <div className="flex items-center justify-between mt-6">
          <hr className="w-1/3 border-gray-300" />
          <span className="text-gray-400">or</span>
          <hr className="w-1/3 border-gray-300" />
        </div>

        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="text-sky-600 text-lg font-semibold hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  </div>
);

};

export default Register;
