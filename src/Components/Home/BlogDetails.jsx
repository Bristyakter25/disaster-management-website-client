import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://disaster-management-website-server.vercel.app/blogPosts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!blog) return <p className="text-center text-red-500">Blog not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <img
        src={blog.Image}
        alt={blog.title}
        className="w-full object-cover h-[600px] rounded-lg mb-6"
      />
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        {blog.title}
      </h1>
      
     

      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {blog.date} | By {blog.author}
      </p>
      <div className="text-lg leading-relaxed text-gray-700 dark:text-gray-200">
  {blog.description?.split('\n').map((para, idx) => (
    <p key={idx} className="mb-4">{para}</p>
  ))}
</div>

      <div className="text-lg leading-relaxed text-gray-700 dark:text-gray-200">
  {blog.content?.split('\n').map((para, idx) => (
    <p key={idx} className="mb-4">{para}</p>
  ))}
</div>
    </div>
  );
};

export default BlogDetails;
