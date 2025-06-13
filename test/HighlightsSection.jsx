import React, { useEffect, useState } from "react";

export default function FashionHeroSection() {
  const [brands, setBrands] = useState(0);
  const [products, setProducts] = useState(0);
  const [customers, setCustomers] = useState(0);

  useEffect(() => {
    const animateCount = (setter, target, duration) => {
      const start = 0;
      const steps = 60;
      const increment = target / steps;
      let current = start;
      let count = 0;

      const timer = setInterval(() => {
        current += increment;
        count++;
        if (count >= steps) {
          setter(Math.floor(target));
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, duration / steps);
    };

    animateCount(setBrands, 500, 1000);
    animateCount(setProducts, 5000, 1000);
    animateCount(setCustomers, 100000, 1000);
  }, []);

  return (
    <div className="bg-white text-black font-sans">
      <div className="w-full mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
          </h1>
          <p className="text-gray-600 mb-6">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <button className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800">
            Shop Now
          </button>

          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xl font-bold">{brands}+</p>
              <p className="text-sm text-gray-500">International Brands</p>
            </div>
            <div>
              <p className="text-xl font-bold">{products.toLocaleString()}+</p>
              <p className="text-sm text-gray-500">High-Quality Products</p>
            </div>
            <div>
              <p className="text-xl font-bold">{customers.toLocaleString()}+</p>
              <p className="text-sm text-gray-500">Happy Customers</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://tse1.mm.bing.net/th?id=OIP.9WF2h4rvyfZlnQa690sIvAHaDd&pid=Api&P=0&h=180"
            alt="Fashion Models"
            className="w-full rounded-xl shadow-lg"
          />
          {/* Star elements */}
          <span className="absolute top-4 left-4 text-black text-3xl">★</span>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black text-4xl">
            ★
          </span>
          <span className="absolute bottom-4 right-4 text-black text-3xl">
            ★
          </span>
        </div>
      </div>

      <div className="bg-black py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center text-white text-xl font-light">
          <span>VERSACE</span>
          <span>ZARA</span>
          <span>GUCCI</span>
          <span className="font-bold">PRADA</span>
          <span>Calvin Klein</span>
        </div>
      </div>
    </div>
  );
}
