import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogPost = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://disaster-management-website-server.vercel.app/blogPosts")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-10 ">
      <h2 className="text-3xl lg:text-5xl tracking-widest text-center mt-24  text-gray-800 font-anton dark:text-white mb-7">
       News & Blogs
      </h2>
      <p className="text-center dark:text-white mb-16 text-gray-700 tracking-wider text-lg">
        Latest disaster news and stories from communities across Bangladesh.
      </p>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {blogs.map((post) => (
          <div
            key={post._id}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={post.Image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="px-4 py-2">
              <h3
                onClick={() => navigate(`/blogPosts/${post._id}`)}
                className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                {post.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
         | By {post.author}
      </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPost;
