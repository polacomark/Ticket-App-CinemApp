import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51KqHrdFIWQ9P9UeS0BNcqq35rXRsXE6uQT0s3qWLIWI1eIvffpupJ781Cflga6GjiGcsYJZQRaLGo1AHrmR4nZF000iEqZdKf7"
);
const CheckoutForm = () => {
  const [film, setFilm] = useState({});
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const { id } = useParams();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(`http://localhost:3001/movies/id/${id}`);
      const movieId = result.data.data;
      setFilm(movieId);
    }

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email,
      },
    });

    if (!error) {
      const { id } = paymentMethod;

      try {
        const { data } = await axios.post("http://localhost:3001/stripe/pago", {
          id,
          amount: film["tickets.precio"] * 100,
        });
        setMessage(data.message);
        setTimeout(() => setMessage(null), 5000);
        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
        setMessage(error.message);
        setTimeout(() => setMessage(null), 5000);
      }
    }

    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <img src={film.image} alt={film.nombre} />
      <p>Correo Electrónico</p>
      <input
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
      />
      <h3>Precio: {film["tickets.precio"]}</h3>
      <CardElement />
      <button disabled={!stripe}>Pagar</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default function Stripe() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
