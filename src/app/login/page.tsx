"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Snackbar, Alert } from "@mui/material";
import { app } from "@/firebase/firebaseConfig";
import { motion } from "framer-motion";
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';


export default function LoginPage() {
  const [email, setEmail] = useState("k7user@shopco.com");
  const [password, setPassword] = useState("k7user");
  const [error, setError] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const auth = getAuth(app);
  const { width, height } = useWindowSize();


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setShowLoader(true);
      setSuccess(true);

      setTimeout(() => {
        router.push("/home");
      }, 5000); 
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed");
      }
    }
  };

 if (showLoader) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
      <Confetti width={width} height={height} numberOfPieces={250} recycle={false} />
      <motion.h1
        className="text-5xl font-extrabold tracking-wider"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
      >
        SHOPCO
      </motion.h1>
      <p className="mt-4 text-lg tracking-wide text-gray-300 italic">
        Wear the Future. Style the Moment.
      </p>
    </div>
  );
}


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-8 max-w-sm w-full text-black"
      >
        <h1 className="text-3xl font-extrabold tracking-wide text-center mb-2">SHOPCO</h1>
        <h2 className="text-xl font-extrabold mb-6 text-center text-gray-800">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded-md">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={showLoader}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition cursor-pointer disabled:opacity-50"
          >
            Log In
          </button>
        </form>
      </motion.div>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          Logged in successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}
