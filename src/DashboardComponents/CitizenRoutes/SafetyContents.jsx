import { useEffect, useState } from "react";
import { BadgeCheck, BookOpen, ShieldAlert } from "lucide-react";

const quizzes = [
  {
    question: "What is the safest action to take during an earthquake?",
    correctAnswer: "Drop, Cover, and Hold On",
    options: [
      "Run outside immediately",
      "Stand near a window",
      "Drop, Cover, and Hold On",
      "Use an elevator to evacuate",
    ],
  },
  {
    question: "Which hotline should you call for emergency medical support in Bangladesh?",
    correctAnswer: "999",
    options: ["911", "100", "999", "199"],
  },
  {
    question: "What item is essential during a flood?",
    correctAnswer: "Portable clean drinking water",
    options: [
      "Luxury clothes",
      "Portable clean drinking water",
      "Smart TV",
      "Desk lamp",
    ],
  },
];

const SafetyContents = () => {
  const [data, setData] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    fetch("https://disaster-management-website-server.vercel.app/safetyContents")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    if (quizAnswer === quizzes[quizIndex].correctAnswer) {
      setResult("🎉 Awesome! You nailed it!");
    } else {
      setResult("❌ Close! Think carefully and retry!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 dark:bg-gray-900 dark:text-white">
      <h1 className="text-4xl font-bold mb-8 text-center flex items-center justify-center gap-2 text-blue-700 dark:text-blue-400">
        <ShieldAlert className="w-8 h-8 text-red-500" />
        Safety & Guidelines
      </h1>

      {/* Safety Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-5 hover:scale-[1.03] transition-transform duration-300 border-t-4 border-blue-500"
          >
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2 text-gray-800 dark:text-white">
              <BookOpen className="w-5 h-5 text-green-600" />
              {item.title}
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              {item.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Quiz Section */}
      <div className="mt-16 p-6 bg-gradient-to-r from-blue-50 to-purple-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-300">
          🧠 Test Your Knowledge
        </h2>
        <p className="mb-4">{quizzes[quizIndex].question}</p>

        <form onSubmit={handleQuizSubmit} className="space-y-3">
          {quizzes[quizIndex].options.map((option, index) => (
            <label
              key={index}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900 transition"
            >
              <input
                type="radio"
                name="quiz"
                value={option}
                onChange={(e) => setQuizAnswer(e.target.value)}
                className="accent-purple-600"
              />
              <span>{option}</span>
            </label>
          ))}

          <button
            type="submit"
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full shadow-md transition"
          >
            Submit Answer
          </button>
        </form>

        {result && (
          <p className="mt-4 text-lg font-medium flex items-center gap-2">
            <BadgeCheck className="w-5 h-5" /> {result}
          </p>
        )}

        {/* Next Question Button */}
        <div className="flex items-center gap-4 mt-6">
  {quizIndex > 0 && (
    <button
      onClick={() => {
        setQuizIndex(quizIndex - 1);
        setResult("");
        setQuizAnswer("");
      }}
      className="text-sm text-blue-700 dark:text-blue-300 hover:underline"
    >
      ⬅️ Previous Question
    </button>
  )}
  {quizIndex < quizzes.length - 1 && (
    <button
      onClick={() => {
        setQuizIndex(quizIndex + 1);
        setResult("");
        setQuizAnswer("");
      }}
      className="text-sm text-blue-700 dark:text-blue-300 hover:underline"
    >
      ➡️ Next Question
    </button>
  )}
</div>

      </div>
    </div>
  );
};

export default SafetyContents;
