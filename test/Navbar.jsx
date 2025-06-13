import React, { useState } from "react";
import { ShoppingCart, User, Search, Menu } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Logo */}
        <div className="text-2xl font-extrabold">SHOP.CO</div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <div className="relative group cursor-pointer">
            <span>Shop</span>
            <span className="ml-1">▼</span>
          </div>
          <a href="#">On Sale</a>
          <a href="#">New Arrivals</a>
          <a href="#">Brands</a>
        </nav>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-1/3">
          <Search className="h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search for products..."
            className="bg-transparent ml-2 w-full focus:outline-none text-sm"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <ShoppingCart className="h-5 w-5 cursor-pointer" />
          <User className="h-5 w-5 cursor-pointer" />
          {/* Hamburger menu for small screens */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-2 text-sm text-gray-700">
          <a href="#" className="block">
            Shop
          </a>
          <a href="#" className="block">
            On Sale
          </a>
          <a href="#" className="block">
            New Arrivals
          </a>
          <a href="#" className="block">
            Brands
          </a>
          {/* Mobile Search */}
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mt-2">
            <Search className="h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search for products..."
              className="bg-transparent ml-2 w-full focus:outline-none text-sm"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
