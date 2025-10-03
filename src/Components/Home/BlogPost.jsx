import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogPost = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://disaster-management-website-server.onrender.com/blogPosts")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  return (
    <div className="max-w-7xl pt-20  mx-auto px-6 lg:px-10">
      {/* Section Title */}
      <h2 className="text-3xl lg:text-5xl tracking-widest text-center mt-24 font-anton text-gray-800 dark:text-white mb-5">
        News & Blogs
      </h2>
      <p className="text-center dark:text-gray-300 text-gray-600 mb-16 text-lg max-w-2xl mx-auto">
        Stay informed with the latest disaster updates, stories, and community resilience efforts across Bangladesh.
      </p>

      {/* Blog Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {blogs.map((post) => (
          <div
            key={post._id}
            onClick={() => navigate(`/blogPosts/${post._id}`)}
            className="group relative bg-transparent dark:bg-transparent rounded-2xl  hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
          >
            {/* Blog Image */}
            <div className="overflow-hidden">
              <img
                src={post.Image}
                alt={post.title}
                className="w-full h-52 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-indigo-500 transition-colors duration-300 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-300 italic">
                By <span className="font-medium">{post.author}</span>
              </p>

              {/* Read More */}
              <button className="mt-3 text-sm font-semibold text-indigo-600 dark:text-indigo-400 group-hover:underline">
                Read More →
              </button>
            </div>

            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPost;
