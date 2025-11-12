import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const MyHelpRequests = () => {
  const [disasters, setDisasters] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch("http://localhost:5000/requestHelps")
      .then((res) => res.json())
      .then((data) => {
        setDisasters(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching helps:", err);
        setLoading(false);
      });
  }, [user]);

  // Filter requests by logged-in user
  const userRequests = disasters.filter((item) => item.contact === user?.email);

  if (loading) {
    return (
      <div className="py-10 dark:bg-gray-900 min-h-screen flex justify-center items-center text-lg text-gray-200">
        Loading your requests...
      </div>
    );
  }

  return (
    <div className="py-10 dark:bg-gray-900 min-h-screen transition-colors">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800 dark:text-white">
        My Submitted Requests
      </h2>

      {userRequests.length === 0 ? (
        <p className="text-left text-gray-600 dark:text-gray-400 text-lg">
          No requests submitted by you.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="px-2 py-2 text-left text-gray-700 dark:text-gray-200">
                  Contact Person
                </th>
                <th className="px-2 py-2 text-left text-gray-700 dark:text-gray-200">
                  Contact Person's Email
                </th>
                <th className="px-2 py-2 text-left text-gray-700 dark:text-gray-200">
                  Help Type
                </th>
                <th className="px-2 py-2 text-left text-gray-700 dark:text-gray-200">
                  Family Members
                </th>
                <th className="px-2 py-2 text-left text-gray-700 dark:text-gray-200">
                  Injured
                </th>
                <th className="px-2 py-2 text-left text-gray-700 dark:text-gray-200">
                  Elderly or Children
                </th>
                <th className="px-2 py-2 text-left text-gray-700 dark:text-gray-200">
                  Urgent Needs
                </th>
                <th className="px-2 py-2 text-left text-gray-700 dark:text-gray-200">
                  Notes
                </th>
                <th className="px-2 py-2 text-left text-gray-700 dark:text-gray-200">
                  Status
                </th>
                <th className="px-2 py-2 text-left text-gray-700 dark:text-gray-200">
                  Network
                </th>
              </tr>
            </thead>
            <tbody>
              {userRequests.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
                >
                  <td className="px-2 py-2">{item.name}</td>
                  <td className="px-2 py-2">{item.contact}</td>
                  <td className="px-2 py-2">{item.helpType}</td>
                  <td className="px-2 py-2">{item.familyMembers}</td>
                  <td className="px-2 py-2">{item.injuredCount}</td>
                  <td className="px-2 py-2">{item.elderlyOrChildren}</td>
                  <td className="px-2 py-2">{item.urgentNeeds}</td>
                  <td className="px-2 py-2">{item.additionalNotes}</td>
                  <td className="px-2 py-2">
                    <span
                      className={`font-semibold ${
                        item.status === "Pending"
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-green-600 dark:text-green-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-2 py-2">{item.networkStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyHelpRequests;
