"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CheckoutPage() {
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [form, setForm] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    address: "123 Main St, Chennai",
    phone: "9876543210",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {
      name: form.name ? "" : "Name is required",
      email: form.email ? "" : "Email is required",
      address: form.address ? "" : "Address is required",
      phone: form.phone ? "" : "Phone is required",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err);
  };

  const handlePayment = () => {
    if (validateForm()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        router.push("/invoice");
      }, 2000);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-extrabold mb-6 text-center">CHECKOUT</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-2">Shipping Information</h2>
            {Object.entries(form).map(([key, value]) => (
              <div key={key}>
                <input
                  type="text"
                  name={key}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={value}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg text-sm focus:outline-none ${
                    errors[key as keyof typeof errors]
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors[key as keyof typeof errors] && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors[key as keyof typeof errors]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full border rounded-lg p-6 shadow-md bg-white">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>₹{total}</span>
            </div>

            <button
  onClick={handlePayment}
  disabled={loading}
  className="cursor-pointer w-full mt-6 bg-black hover:bg-gray-800 text-white py-3 px-6 rounded-full flex justify-center items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading && <Loader2 className="animate-spin w-4 h-4" />}
  Proceed to Pay
</button>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
