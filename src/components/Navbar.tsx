"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, X, Search, Menu } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { app } from "@/firebase/firebaseConfig";
import {
  Avatar,
  IconButton,
  Menu as MuiMenu,
  MenuItem,
  Typography,
  CircularProgress,
} from "@mui/material";
import toast from "react-hot-toast";
import { products } from "@/data/products";

export default function Navbar() {
  const [showBanner, setShowBanner] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const open = Boolean(anchorEl);
  const router = useRouter();

  const cartItems = useSelector((state: RootState) => state.cart.items);
const cartCount = cartItems.length;
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    setIsClient(true);
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await signOut(auth);
      setAnchorEl(null);
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const input = e.target.value;
  setSearchQuery(input);

  if (!input.trim()) {
    setSuggestions([]);
    return;
  }

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(input.toLowerCase())
  );

  setSuggestions(
    filtered.length > 0
      ? filtered.map((p) => p.name)
      : ["No products found!"]
  );
};


  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion !== "No products found!") {
      setSearchQuery(suggestion);
      setSuggestions([]);
      router.push(`/search?q=${encodeURIComponent(suggestion)}`);
    }
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      setSuggestions([]);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="w-full font-sans integral-font text-black">
      {loggingOut && (
        <div className="fixed top-0 left-0 w-full h-full bg-white/80 flex flex-col items-center justify-center z-50">
          <CircularProgress />
          <span className="mt-4 text-lg font-semibold">Logging out...</span>
        </div>
      )}

      {showBanner && (
        <div className="bg-black text-white text-sm text-center px-4 py-2 relative">
          <span>
            GET <strong>20% OFF</strong> ON YOUR FIRST ORDER.{" "}
            <Link href="/shop" className="underline font-extrabold">
              SHOP NOW
            </Link>
          </span>
          <button
            onClick={() => setShowBanner(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between px-4 py-4 md:px-6 bg-white shadow-sm relative z-10">
        <div className="flex items-center gap-4">
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu className="text-black" />
          </button>

          <Link href="/home" className="text-2xl font-extrabold tracking-wide text-black">
            SHOP.CO
          </Link>
        </div>

        <nav className="hidden md:flex gap-6 font-bold text-sm">
          <Link href="/shop" className="hover:underline text-black">
            Shop
          </Link>
          <Link href="/category/casual" className="hover:underline text-black">
            Casual
          </Link>
           <Link href="/category/formal" className="hover:underline text-black">
            Formal
          </Link>
          <Link href="/category/sport" className="hover:underline text-black">
            Sports
          </Link>
        </nav>

        <div className="flex items-center gap-4 md:gap-6 relative">
          <div className="hidden md:flex items-center relative">
            <div className="relative w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="What are your looking for?"
                className="w-full bg-gray-100 h-10 px-4 pl-10 text-sm rounded-full focus:outline-none"
              />
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={handleSearchSubmit}
              />
              {suggestions.length > 0 && (
                <ul className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-b-md shadow-md z-20 max-h-60 overflow-y-auto text-sm">
                  {suggestions.map((suggestion, idx) => (
                    <li
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                        suggestion === "No products found!" &&
                        "text-gray-400 cursor-default"
                      }`}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <Link href="/cart" className="relative text-black">
  <ShoppingCart size={26} />
  {isClient && cartCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
      {cartCount}
    </span>
  )}
</Link>

          {user ? (
            <>
              <div className="flex items-center gap-2">
                <IconButton onClick={handleMenuClick}>
                  <Avatar sx={{ width: 32, height: 32 }} />
                </IconButton>
                <Typography className="text-sm hidden md:block">
                  {user.email?.split("@")[0]}
                </Typography>
              </div>
              <MuiMenu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                <MenuItem disabled>{user.email}</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MuiMenu>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 text-black hover:underline"
            >
              <Avatar
                sx={{ width: 30, height: 30, bgcolor: "#ccc", fontSize: 14 }}
              >
                L
              </Avatar>
              <span className="hidden md:block text-sm">Login</span>
            </Link>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-4 space-y-4 flex flex-col">
          <Link href="/shop" onClick={() => setMenuOpen(false)} className="block text-black">
            Shop
          </Link>
          <Link href="/category/casual" onClick={() => setMenuOpen(false)} className="block text-black">
             Casual
          </Link>
          <Link href="/category/formal" onClick={() => setMenuOpen(false)} className="block text-black">
            Formal
          </Link>
          <Link href="/category/sport" onClick={() => setMenuOpen(false)} className="block text-black">
            Sports
          </Link>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery.trim()) {
                  handleSearchSubmit();
                }
              }}
              placeholder="What are your looking for?"
              className="w-full bg-gray-100 h-10 px-4 pl-10 text-sm rounded-full focus:outline-none"
            />
            <Search
              size={16}
              onClick={handleSearchSubmit}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
            />
          </div>
        </div>
      )}
    </header>
  );
}
