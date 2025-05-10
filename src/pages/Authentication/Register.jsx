import React, { useContext } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { auth } from '../../firebase/firebase.init';


const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = e => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const role = e.target.role.value;

    console.log('Form sign-up data:', { email, password, name, photo, role });

    createUser(email, password)
      .then(result => {
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

              // 💾 Save user to the database
              fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify(newUser)
              })
                .then(res => res.json())
                .then(data => {
                  if (data.insertedId) {
                    console.log('User saved in DB');

                    
                    navigate('/');
                  }
                });
            });
          })
          .catch(error => {
            console.error('Error updating profile:', error);
          });
      })
      .catch(error => {
        console.error('Registration error:', error);
      });
  };

  return (
    <div>
      {/* Header section */}
      <div className="text-center mb-10 py-32 bg-gradient-to-r from-white to-sky-200 dark:from-[#00072D] dark:to-[#001F54]">
        <h2 className="text-5xl dark:text-white font-bold mb-5">Register Here!</h2>
        <div className="flex dark:text-white items-center justify-center gap-x-3 text-center">
          <Link to="/" className="text-lg hover:text-blue-500">Home</Link>
          <p className="mt-2"><FaLongArrowAltRight /></p>
          <p className="text-lg">Registration</p>
        </div>
      </div>

      {/* Form section */}
      <div className="hero-content">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input type="url" name="photo" placeholder="Photo URL" className="input input-bordered" required />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" name="password" placeholder="Password" className="input input-bordered" required />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select name="role" className="select select-bordered" required>
                <option value="Citizen">Citizen</option>
                <option value="Rescue Member">Rescue Member</option>
              </select>
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
