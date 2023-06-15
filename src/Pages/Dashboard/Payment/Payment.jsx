import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckOut";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const cart = useLoaderData()
    console.log(cart)
    const { classname, price } = cart
    return (
        <div className="">
            <div>
                <h3 className="text-4xl font-bold text-center">Payment</h3>
            </div>
            <div className="card w-96 bg-base-100 shadow-xl mx-auto my-16">
                <div className="card-body">
                    <h2 className="card-title">ClassName: {classname}</h2>
                    <h2 className="card-title font-bold">Price : ${price}</h2>
                    <div className="my-5">
                        <Elements stripe={stripePromise}>
                            <CheckoutForm
                                cart={cart}
                            />
                        </Elements>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;