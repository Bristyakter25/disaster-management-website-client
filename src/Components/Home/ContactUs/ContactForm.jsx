import { motion } from "framer-motion";

const ContactForm = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8 flex items-center">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white leading-snug">
            Let’s Work Together
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            We're here to listen, help, and connect. Reach out to us anytime
            with your thoughts, questions, or suggestions.
          </p>

          <div className="space-x-12 flex text-gray-700 dark:text-gray-300">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Address:</h4>
              <p>15 No, Najimuddin Road</p>
              <p>Dhaka</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Information:</h4>
              <p>📞 +880 1910628025</p>
              <p>📧 sabihaakterbristy@gmail.com</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Our Social Media:</h4>
            <div className="flex gap-4 mt-2">
              <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">🌐 Facebook</a>
              <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">🐦 Twitter</a>
              <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">📸 Instagram</a>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Send Us a Message
          </h3>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="mt-1 block w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-1 block w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="mt-1 block w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-black dark:bg-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-900 dark:hover:bg-indigo-500 transition-all"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactForm;
