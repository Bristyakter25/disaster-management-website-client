import React, { useState, useEffect, useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ donor, disaster, amount, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const cardElementOptions = useMemo(
    () => ({
      style: {
        base: {
          fontSize: "16px",
          color: isDark ? "#ffffff" : "#000000",
          "::placeholder": {
            color: isDark ? "#9ca3af" : "#6b7280", // gray-400 vs gray-600
          },
        },
        invalid: {
          color: "#f87171", // red-400
        },
      },
    }),
    [isDark]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
     
      const saveRes = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/alertPanel/save-donation`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            donor: donor,
            disaster: { _id: disaster?._id },
            amount,
            date: new Date(),
          }),
        }
      );
      const saveData = await saveRes.json();

      if (!saveData.success) {
        Swal.fire("Error", "Failed to save donation info", "error");
        setLoading(false);
        return;
      }

      const donationId = saveData.id;

      const paymentRes = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/create-payment-intent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: amount * 100 }), // in cents
        }
      );
      const { clientSecret } = await paymentRes.json();

     
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: donor?.name,
            email: donor?.email,
          },
        },
      });

      if (result.error) {
        Swal.fire("Payment Failed", result.error.message, "error");
      } else if (result.paymentIntent.status === "succeeded") {
      
        if (onSuccess) {
          onSuccess(amount);
        }

        Swal.fire(
          "Success!",
          "🎉 Donation Successful! Thank you ❤️",
          "success"
        );

      
        await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/alertPanel/donation-success/${donationId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentId: result.paymentIntent.id }),
          }
        );

       
        navigate("/donateUs");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong during donation!", "error");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-4 bg-white dark:bg-slate-800 shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold text-center mb-4">
        Donate to {disaster?.headline}
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
        Helping {disaster?.location} — Amount: ৳{amount}
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 dark:text-white text-black"
      >
        <CardElement
          options={cardElementOptions}
          className="p-3 border rounded-md bg-gray-50 dark:bg-black"
        />
        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700"
        >
          {loading ? "Processing..." : "Donate Now"}
        </button>
      </form>
    </div>
  );
}

export default function PaymentPage({ donor, disaster, amount, onSuccess }) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        donor={donor}
        disaster={disaster}
        amount={amount}
        onSuccess={onSuccess}   
      />
    </Elements>
  );
}