"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "@/redux/slices/cartSlice";
import { CartItem } from "@/types/cart";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity >= 1) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <>
      <Navbar />
      <div className="px-4 md:px-6 py-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-extrabold mb-6">YOUR CART</h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500">
            Your cart is empty.{" "}
            <Link href="/shop" className="text-blue-600 underline">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1 space-y-4">
              {cartItems.map((item: CartItem) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 border rounded-xl p-4 shadow-sm"
                >
                  <div className="h-24 w-24 relative">
  <Image
    src={item.image}
    alt={item.name}
    fill
    className="rounded-md object-cover object-center"
  />
</div>
                  <div className="flex-1 space-y-1">
                    <h2 className="font-semibold text-lg">{item.name}</h2>
                    <p className="text-sm text-gray-500">
                      ₹{item.price} × {item.quantity} = ₹
                      {item.price * item.quantity}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        className="border px-2 rounded"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        className="border px-2 rounded"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        className="ml-auto text-red-600"
                        onClick={() => handleRemove(item.id)}
                      >
                        <Trash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-[350px] bg-white p-6 rounded-xl shadow-md space-y-4">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Items</span>
                <span>{cartItems.length}</span>
              </div>
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-black text-white py-3 rounded-full font-semibold hover:opacity-90 transition"
              >
                Go to Checkout →
              </button>

              <button
                onClick={() => dispatch(clearCart())}
                className="w-full border border-black text-black py-3 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
