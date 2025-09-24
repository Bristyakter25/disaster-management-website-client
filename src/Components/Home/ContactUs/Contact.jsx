import React from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
    return (
        <div className='text-center pt-24 pb-20'>
            <h2 className="lg:text-5xl text-3xl tracking-widest text-center text-gray-800 font-anton dark:text-white mb-10">Let’s Start The Conversation!</h2>
            <p className='text-gray-700 my-5 w-[250px] lg:w-[450px] mx-auto'>Have a story to share or a question to ask? Reach out we're always
listening and excited to hear from you!</p>
<Link to="/contactForm"><button className='btn hover:bg-gray-800 bg-black text-white rounded-2xl p-5'>Contact Us</button></Link>
        </div>
    );
};

export default Contact;