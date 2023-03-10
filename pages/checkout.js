import React, { Component } from "react";
import Header from "./components/Header";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import CheckoutProduct from "./components/CheckoutProduct";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {
  const total = useSelector(selectTotal);
  const items = useSelector(selectItems);
  const { data: session } = useSession();

  const createCheckOutSession = async () => {
    const stripe = await stripePromise;

    //call the backend to creatre a checkout session for stripe

    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items,
      email: session.user.email,
    });

    //redirect to checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            alt="image"
            width={1020}
            height={250}
            className="object-contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Amazon Basket is empty "
                : "Shopping Basket"}
            </h1>
            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                rating={item.rating}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
              />
            ))}
          </div>
        </div>
        {/* right */}
        <div className="flex flex-col bg-white p-10 shadow-md ">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                SubTotal ({items.length} items) :{" "}
                <span className="font-bold">
                  <span>{total}$</span>
                </span>
              </h2>

              <button
                role="link"
                onClick={createCheckOutSession}
                disabled={!session}
                className={`button  ${
                  !session &&
                  "from-slate-200 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign in to Checkout" : "Proceed To Checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
export default Checkout;
