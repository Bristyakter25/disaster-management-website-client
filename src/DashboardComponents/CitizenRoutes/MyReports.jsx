import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const MyReports = () => {
  const { user } = useContext(AuthContext);
  const [disasters, setDisasters] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/alertPanel?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setDisasters(data));
    }
  }, [user]);

  return (
    <div className="px-4 md:px-5 lg:px-10 py-5 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors">
      <h2 className="text-3xl font-extrabold mb-10 text-center text-gray-800 dark:text-white">
        My Submitted Alerts
      </h2>

      {disasters.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
          No alerts submitted by you.
        </p>
      ) : (
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
          {disasters.map((item) => (
            <div
              key={item._id}
              className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md dark:shadow-md rounded-xl overflow-hidden transition-transform transform hover:scale-[1.02] duration-300 hover:shadow-2xl dark:hover:shadow-2xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt="Disaster"
                  className="w-full h-48 object-cover group-hover:brightness-90 transition duration-300"
                />
              </div>
              <div className="p-5 space-y-3">
                <h3 className="text-xl font-bold text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300">
                  🚨 {item.headline}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {item.type}
                  </span>{" "}
                  | Severity:{" "}
                  <span className="font-semibold text-yellow-700 dark:text-yellow-400">
                    {item.severity}
                  </span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  📍 {item.location}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReports;
