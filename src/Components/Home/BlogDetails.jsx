import { useLocation, useNavigate } from 'react-router-dom';

const BlogDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.article) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600">No article data available.</p>
        <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Go Back
        </button>
      </div>
    );
  }

  const { article } = state;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <button onClick={() => navigate(-1)} className="mb-6 text-blue-600 hover:underline">
        ← Back to Articles
      </button>

      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(article.publishedAt).toLocaleString()} | {article.author || 'Unknown Author'}
      </p>
      {article.urlToImage && (
        <img src={article.urlToImage} alt={article.title} className="w-full h-96 object-cover rounded mb-6" />
      )}
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        {article.content || article.description || 'No content available.'}
      </p>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-6 text-blue-500 hover:underline font-medium"
      >
        Read full article →
      </a>
    </div>
  );
};

export default BlogDetails;
