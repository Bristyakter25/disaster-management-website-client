import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogPost = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/blogPosts")
      .then(res => res.json())
      .then(data => setArticles(data.articles || []))
      .catch(err => console.error(err));
  }, []);

  const handleClick = (article) => {
    navigate(`/blog/${encodeURIComponent(article.title)}`, { state: { article } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        Latest News & Blogs
      </h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((post, index) => (
          <div
            key={index}
            onClick={() => handleClick(post)}
            className="cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition duration-300"
          >
            {post.urlToImage && (
              <img
                src={post.urlToImage}
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-md"
              />
            )}
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-2">
                {post.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-3">
                {post.description || "No description available."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPost;
