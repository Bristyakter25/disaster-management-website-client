import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    // Create Payment Intent
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 5000 }), // $50.00 in cents
    });
    const { clientSecret } = await res.json();

    // Confirm Payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      alert(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        alert("Payment Successful!");
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/save-payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: result.paymentIntent.amount,
      currency: result.paymentIntent.currency,
      paymentId: result.paymentIntent.id,
      status: result.paymentIntent.status,
      email: "donor@example.com", // optional: get from auth
      date: new Date(),
    }),
  });
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="pt-40">
        <h2>this is payment interface</h2>
      <CardElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        style={{
          marginTop: "100px",
          padding: "10px 20px",
          background: "#6772E5",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}

export default function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
