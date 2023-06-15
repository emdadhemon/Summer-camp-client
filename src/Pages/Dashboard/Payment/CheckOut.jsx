import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Providers/AuthProvider";

const CheckOut = ({ cart }) => {
    const {user} = useContext(AuthContext)
    const [cardError, setCardError] = useState("");
    const [success, setSuccess] = useState("");
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const { price, email, classname, classimage, _id } = cart;
    const navigate = useNavigate()

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://summer-camp-school-server-mocha.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });
        if (error) {
            setCardError(error.message);
        } else {
            setCardError("");
        }
        setSuccess("");
        setProcessing(true);
        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: email,
                    },
                },
            });
        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }
        if (paymentIntent.status === "succeeded") {
            const payment = {
                price,
                transactionId: paymentIntent.id,
                email,
                classname,
                classimage,
                buyingId: _id,
            };
            fetch("https://summer-camp-school-server-mocha.vercel.app/payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify(payment),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.insertedId) {
                        setSuccess("Your payment completed");
                        setTransactionId(paymentIntent.id);
                    }
                });
        }
        setProcessing(false);
    };
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                                color: "#aab7c4",
                            },
                        },
                        invalid: {
                            color: "#9e2146",
                        },
                    },
                }}
            />

            <div className="card-actions justify-end">
                <button
                    className="btn btn-sm mt-4"
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}
                >
                    Pay
                </button>
            </div>
            <p className="text-red-500">{cardError}</p>
            {success && (
                <div>
                    <p className="text-green-300">{success}</p>
                    <p className="font-bold">Your TransactionId:{transactionId}</p>
                </div>
            )}
        </form>
    );
};

export default CheckOut;