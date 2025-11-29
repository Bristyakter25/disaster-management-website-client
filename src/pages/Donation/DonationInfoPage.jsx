import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PaymentPage from "../../Components/Payment/PayementPage";
import Swal from "sweetalert2";

const DonationInfoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [disaster, setDisaster] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [donationAmount, setDonationAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState("");
  const [canPay, setCanPay] = useState(false);

  useEffect(() => {
    fetch(
      `https://disaster-management-website-server.onrender.com/alertPanel/donations/${id}`
    )
      .then((res) => res.json())
      .then((data) => setDisaster(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!disaster) return null;

  const received = disaster.donationReceived || 0;
  const goal = disaster.donationGoal || 1;
  const percentage = Math.min((received / goal) * 100, 100);

  // ✅ Update UI instantly after successful payment
  const handleDonationSuccess = (donatedAmount) => {
    setDisaster((prev) =>
      prev
        ? {
            ...prev,
            donationReceived: (prev.donationReceived || 0) + Number(donatedAmount),
          }
        : prev
    );

    Swal.fire({
      icon: "success",
      title: "Thank You!",
      text: `Your donation of ৳${donatedAmount} was successful.`,
    });
  };

  // ✅ Validate and save donor info before payment
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email) {
      Swal.fire({
        icon: "warning",
        title: "Form Incomplete",
        text: "Please fill in your name and email before proceeding.",
      });
      setCanPay(false);
      return;
    }

    const donationInfo = {
      donor: form,
      disaster: {
        _id: disaster._id,
        headline: disaster.headline,
      },
      amount: customAmount || donationAmount,
      date: new Date(),
    };

    // fetch(
    //   "https://disaster-management-website-server.onrender.com/alertPanel/save-donation",
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(donationInfo),
    //   }
    // )
      
        Swal.fire({
          icon: "success",
          title: "Form Submitted",
          text: "You can now proceed to payment!",
        });
        setCanPay(true);
      
  };

  return (
    <div className="min-h-screen pt-28 bg-gray-100 dark:bg-gray-900 p-4 flex flex-col items-center">
      {/* Hero Section */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-sky-300 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
        {/* Left: Image */}
        <div className="md:w-1/2 h-64 md:h-auto">
          <img
            src={disaster.image}
            alt={disaster.headline}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Right: Disaster info */}
        <div className="md:w-1/2 p-6 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white text-gray-900">
            You are donating to:
          </h2>
          <h3 className="text-xl md:text-2xl font-semibold mb-6 dark:text-gray-300 text-gray-700">
            {disaster.headline}
          </h3>
          {/* Progress */}
          <div className="mb-4">
            <div className="flex justify-between mb-1 items-center">
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {Math.floor(percentage)}%
              </span>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Goal: ৳{goal}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-4 rounded-full">
              <div
                className="h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <p className="mt-1 text-left text-sm dark:text-gray-300 text-gray-600">
              Raised: ৳{received}
            </p>
          </div>
        </div>
      </div>

      {/* Donor Form + Payment */}
      <div className="flex flex-col md:flex-row justify-between gap-6 w-full max-w-5xl">
        {/* Left: Donor Form */}
        <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6 text-center dark:text-white text-gray-900">
            Your Details
          </h2>
          <form onSubmit={handleFormSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 border rounded-md dark:bg-gray-900 dark:text-white bg-gray-100 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 border rounded-md dark:bg-gray-900 dark:text-white bg-gray-100 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              placeholder="Message (optional)"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border rounded-md dark:bg-gray-900 dark:text-white bg-gray-100 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white font-bold rounded-lg shadow-md transition duration-200"
            >
              Save & Proceed
            </button>
          </form>
        </div>

        {/* Right: Payment Section */}
        <div className="w-full md:w-1/2 dark:text-white bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 space-y-6">
          <h2 className="text-2xl font-bold mb-4 dark:text-white text-gray-900 text-center">
            Payment Details
          </h2>

          {/* Donation Amount Selection */}
          <div>
            <h3 className="font-semibold mb-2 dark:text-white text-gray-900">
              Choose Donation Amount (TK)
            </h3>
            <div className="flex flex-wrap gap-3 mb-4">
              {[100, 500, 1000, 2000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setDonationAmount(amt)}
                  className={`px-4 py-2 rounded-lg border ${
                    donationAmount === amt
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  }`}
                >
                  {amt} TK
                </button>
              ))}
              <input
                type="number"
                placeholder="Custom"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-24 px-3 py-2 border rounded-lg dark:bg-gray-900 bg-white dark:text-white border-gray-300 dark:border-gray-700"
              />
            </div>
          </div>

          {canPay ? (
            <PaymentPage
              donor={form}
              disaster={disaster}
              amount={customAmount || donationAmount}
              onSuccess={handleDonationSuccess} // ✅ pass success handler
            />
          ) : (
            <div className="text-center text-red-600 font-semibold">
              Please fill in your details to enable payment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationInfoPage;
