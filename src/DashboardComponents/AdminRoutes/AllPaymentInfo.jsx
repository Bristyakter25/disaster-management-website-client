import { useEffect, useState } from "react";


const AllPaymentInfo = () => {
    const [payments, setPayments] = useState([]);
      const [loading, setLoading] = useState(true);
     
    
      useEffect(() => {
          fetch("http://localhost:5000/paymentsInfo")
            .then((res) => res.json())
            .then((data) => {
              setPayments(data);
              setLoading(false);
            })
            .catch((err) => {
              console.error("Failed to load users:", err);
              setLoading(false);
            });
        }, []);
    
      if (loading) {
        return (
          <div className="py-10 dark:bg-gray-900 min-h-screen flex justify-center items-center text-lg text-gray-200">
            Loading your payment information...
          </div>
        );
      }
    return (
        <div className="pt-5 pb-10 dark:bg-gray-900 min-h-screen transition-colors">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800 dark:text-white">
        All Payments Information
      </h2>

      {payments.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
          Something went wrong!!!
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="px-3 py-2 text-left text-gray-700 dark:text-gray-200">
                  Donor Name
                </th>
                <th className="px-3 py-2 text-left text-gray-700 dark:text-gray-200">
                  Donor Email
                </th>
                <th className="px-3 py-2 text-left text-gray-700 dark:text-gray-200">
                  Disaster ID
                </th>
                <th className="px-3 py-2 text-left text-gray-700 dark:text-gray-200">
                  Amount
                </th>
                <th className="px-3 py-2 text-left text-gray-700 dark:text-gray-200">
                  Message
                </th>
                <th className="px-3 py-2 text-left text-gray-700 dark:text-gray-200">
                  Status
                </th>
                <th className="px-3 py-2 text-left text-gray-700 dark:text-gray-200">
                  Payment ID
                </th>
                <th className="px-3 py-2 text-left text-gray-700 dark:text-gray-200">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
                >
                  <td className="px-3 py-2">{item.donor?.name}</td>
                  <td className="px-3 py-2">{item.donor?.email}</td>
                  <td className="px-3 py-2">{item.disaster?._id}</td>
                  <td className="px-3 py-2">${item.amount}</td>
                  <td className="px-3 py-2">{item.donor?.message || "—"}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`font-semibold ${
                        item.status === "completed"
                          ? "text-green-600 dark:text-green-400"
                          : "text-yellow-600 dark:text-yellow-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">{item.paymentId}</td>
                  <td className="px-3 py-2">
                    {new Date(item.date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    );
};

export default AllPaymentInfo;