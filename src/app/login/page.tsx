"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Snackbar, Alert } from "@mui/material";
import { app } from "@/firebase/firebaseConfig";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("testuser@shopcoclient.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const auth = getAuth(app);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 1200);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-8 max-w-sm w-full text-black"
      >
        {/* SHOP.CO Branding */}
        <h1 className="text-3xl font-extrabold tracking-wide text-center mb-2">SHOP.CO</h1>

        <h2 className="text-xl font-extrabold mb-6 text-center text-gray-800">Welcome Back</h2>

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
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded-md">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            Log In
          </button>
        </form>
      </motion.div>

      {/* Success Snackbar */}
      <Snackbar open={success} autoHideDuration={3000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled">
          Logged in successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}
