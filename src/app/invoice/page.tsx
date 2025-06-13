"use client";

import { useRef } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function InvoicePage() {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const BlackOvalButton = styled(Button)({
    backgroundColor: "#000000",
    color: "#ffffff",
    borderRadius: "24px",
    padding: "8px 24px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#333333",
    },
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-center">
        <div className="bg-white shadow-xl rounded-lg p-8 max-w-2xl w-full" ref={invoiceRef}>
          <h1 className="text-2xl font-bold text-center text-green-600 mb-4">
            Payment Successful
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Thank you for your purchase! Your order has been processed successfully.
          </p>

          <div className="border p-4 rounded mb-6">
            <h2 className="text-lg font-semibold mb-2">Invoice Summary</h2>
            <ul className="text-sm text-gray-700 space-y-1">
              <li><strong>Name:</strong> John Doe</li>
              <li><strong>Email:</strong> johndoe@email.com</li>
              <li><strong>Phone:</strong> 9876543210</li>
              <li><strong>Address:</strong> 123 Main Street, Chennai, India</li>
              <li><strong>Total:</strong> ₹4,299</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <BlackOvalButton variant="contained">
            Thanks For Shopping With Us
          </BlackOvalButton>

          <BlackOvalButton
            variant="contained"
            onClick={() => router.push("/")}
          >
            Back to Home
          </BlackOvalButton>
        </div>
      </div>
      <Footer />
    </>
  );
}
