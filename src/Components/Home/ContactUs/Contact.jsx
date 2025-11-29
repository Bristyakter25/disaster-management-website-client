import React from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
    return (
        <div className='text-center pt-24 pb-20'>
            <h2 className="lg:text-5xl text-3xl tracking-widest text-center text-gray-800 font-anton dark:text-white mb-10">Let’s Start The Conversation!</h2>
            <p className='text-gray-700 dark:text-white my-5 w-[250px] lg:w-[450px] mx-auto'>Have a story to share or a question to ask? Reach out we're always
listening and excited to hear from you!</p>
<Link to="/contactForm"><button className='mt-4  px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-indigo-600 dark:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-600 dark:hover:from-purple-700 dark:hover:to-indigo-600 transition-all duration-300"'>Contact Us</button></Link>
        </div>
    );
};

export default Contact;