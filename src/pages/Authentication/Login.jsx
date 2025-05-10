import React, { useContext } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const Login = () => {
    const {logInUser} = useContext(AuthContext);
    const navigate = useNavigate(); 
    const handleLogin = e =>{
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        
        console.log ('form sign up', email,password);

        logInUser(email, password)
        .then(result =>{
            console.log(result.user);
            navigate("/");
        })
        .catch( error =>{
            console.log('error',error)
        })
    }
    return (
        <div>
        <div className="text-center mb-10  ark:text-white py-32 bg-gradient-to-r from-white to-sky-200 dark:from-[#00072D] dark:to-[#001F54]">
        <h2 className="text-5xl dark:text-white font-bold mb-5">Log in Here! </h2>

        <div className="flex dark:text-white items-center justify-center gap-x-3 text-center ">
          <Link
           to="/" className="text-lg hover:text-blue-500">
            Home
          </Link>
          <p className="mt-2 ">
            {" "}
            <FaLongArrowAltRight />
          </p>
          <p className="text-lg ">Log In</p>
        </div>
     </div>
          
  <div className="hero-content ">
 
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
   
      <form onSubmit={handleLogin} className="card-body">
      
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email"
          name='email' className="input input-bordered" required />
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" 
          name='password'
          className="input input-bordered" required />
          
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Log In</button>
        </div>
      </form>
    </div>
  </div>
</div>
    );
};

export default Login;