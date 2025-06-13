import React from "react";

export default function FooterNewsletter() {
  return (
    <footer className="bg-gray-100 text-sm text-gray-700">
      {/* Newsletter Signup */}
      <div className="bg-black text-white py-10 px-6 md:px-20 rounded-b-3xl">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h2>
          <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="rounded-full px-4 py-2 text-black w-72 focus:outline-none"
            />
            <button className="bg-white text-black rounded-full px-6 py-2 font-semibold">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto py-10 px-6 grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="font-bold text-lg">SHOP.CO</h3>
          <p className="mt-2 text-sm">
            We have clothes
            <span className="hidden lg:inline">
              <br />
            </span>
            that suits your style
            <span className="hidden lg:inline">
              <br />
            </span>
            and which you’re
            <span className="hidden lg:inline">
              <br />
            </span>
            proud to wear.
            <span className="hidden lg:inline">
              <br />
            </span>
            From women to men.
          </p>

          <div className="flex space-x-3 mt-4">
            <img
              src="https://tse4.mm.bing.net/th?id=OIP.O00L3v25c10flEOPS3RjEQHaGF&pid=Api&P=0&h=180"
              alt="Twitter"
              className="w-5 h-5"
            />
            <img
              src="https://tse1.mm.bing.net/th?id=OIP.vO9hNidzFHJ-jBUZ6hidTgHaHx&pid=Api&P=0&h=180"
              alt="Facebook"
              className="w-5 h-5"
            />
            <img
              src="https://tse4.mm.bing.net/th?id=OIP.8lYmV6tz9W6QwXzFOgu2LgHaHZ&pid=Api&P=0&h=180"
              alt="Instagram"
              className="w-5 h-5"
            />
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.NnzOwCXrYUQYzVmOYT2YFQHaHa&pid=Api&P=0&h=180"
              alt="Pinterest"
              className="w-5 h-5"
            />
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-bold mb-3">COMPANY</h4>
          <ul className="space-y-2">
            <li>About</li>
            <li>Features</li>
            <li>Works</li>
            <li>Career</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-3">HELP</h4>
          <ul className="space-y-2">
            <li>Customer Support</li>
            <li>Delivery Details</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-3">FAQ</h4>
          <ul className="space-y-2">
            <li>Account</li>
            <li>Manage Deliveries</li>
            <li>Orders</li>
            <li>Payments</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-3">RESOURCES</h4>
          <ul className="space-y-2">
            <li>Free eBooks</li>
            <li>Development Tutorial</li>
            <li>How to - Blog</li>
            <li>Youtube Playlist</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-xs py-4 border-t border-gray-300">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6">
          <p>Shop.co © 2000-2023, All Rights Reserved</p>
          <div className="flex space-x-3 mt-2 md:mt-0">
            <img
              src="https://tse1.mm.bing.net/th?id=OIP.DCgfEJDZZDka6j0wAAPFrAHaEK&pid=Api&P=0&h=180"
              alt="Visa"
              className="h-5"
            />
            <img
              src="https://tse1.mm.bing.net/th?id=OIP.iPcVDe87mw9ipTIkRCb8FAHaDQ&pid=Api&P=0&h=180"
              alt="Mastercard"
              className="h-5"
            />
            <img
              src="https://tse1.mm.bing.net/th?id=OIP.CK9P44mPPsVjZRi3BNEPBQHaEK&pid=Api&P=0&h=180"
              alt="Paypal"
              className="h-5"
            />
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.2asCjb3Nv_FVK8K8Hp4I8AHaEK&pid=Api&P=0&h=180"
              alt="Apple Pay"
              className="h-5"
            />
            <img
              src="https://tse1.mm.bing.net/th?id=OIP.ZyjY9hj_UxgzxpvYMFaTdgHaHa&pid=Api&P=0&h=180"
              alt="Google Pay"
              className="h-5"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
