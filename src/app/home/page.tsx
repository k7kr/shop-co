"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const [brands, setBrands] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [customers, setCustomers] = useState(0);
  const dressStyles = [
    {
      name: "Casual",
      href: "/category/casual",
      imgSrc: "/shirts.png",
      alt: "A man wearing a casual light blue t-shirt.",
    },
    {
      name: "Formal",
      href: "/category/formal",
      imgSrc: "/formal-shirts.png",
      alt: "A man wearing a formal checkered blazer.",
    },

    {
      name: "Sports",
      href: "/category/sport",
      imgSrc: "/sports.png", 
      alt: "A person in a tank top lifting a dumbbell.",
    },
  ];

  useEffect(() => {
    const animateCount = (
      setter: React.Dispatch<React.SetStateAction<number>>,
      target: number,
      duration: number
    ) => {
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
    animateCount(setProductsCount, 5000, 1000);
    animateCount(setCustomers, 100000, 1000);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow px-6 md:px-20 py-10 space-y-16">
        <section className="bg-white text-black font-sans">
          <div className="w-full mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
              </h1>
              <p className="text-gray-600 mb-6">
                Browse through our diverse range of meticulously crafted
                garments, designed to bring out your individuality and cater to
                your sense of style.
              </p>
              <Link href="/shop" className="inline-block">
                <button className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
                  Shop Now
                </button>
              </Link>

              <div className="mt-10 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xl font-bold">{brands}+</p>
                  <p className="text-sm text-gray-500">International Brands</p>
                </div>
                <div>
                  <p className="text-xl font-bold">
                    {productsCount.toLocaleString()}+
                  </p>
                  <p className="text-sm text-gray-500">High-Quality Products</p>
                </div>
                <div>
                  <p className="text-xl font-bold">
                    {customers.toLocaleString()}+
                  </p>
                  <p className="text-sm text-gray-500">Happy Customers</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/couple.png"
                alt="Fashion Models"
                width={600}
                height={600}
                className="w-full rounded-xl shadow-lg"
                priority
              />
              <span className="absolute top-4 left-4 text-black text-3xl">
                ★
              </span>
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black text-4xl">
                ★
              </span>
              <span className="absolute bottom-4 right-4 text-black text-3xl">
                ★
              </span>
            </div>
          </div>

          <div className="w-screen bg-black py-6 relative left-1/2 right-1/2 -mx-[50vw] px-0 overflow-hidden">
            <div className="whitespace-nowrap flex animate-scroll-marquee gap-16 text-white text-xl font-light">
              {Array(2)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex gap-16 px-4">
                    <span>Tommy Hilfiger</span>
                    <span>VERSACE</span>
                    <span>ZARA</span>
                    <span>GUCCI</span>
                    <span>Calvin Klein</span>
                    <span className="font-bold">PRADA</span>
                    <span>Calvin Klein</span>
                    <span>H&M</span>
                    <span>Levi’s</span>
                    <span>Tommy Hilfiger</span>
                    <span>FILA</span>
                    <span>HR</span>
                  </div>
                ))}
            </div>
          </div>
        </section>

       
        <section>
          <h2 className="text-3xl font-extrabold mb-6 text-center">
            TOP SELLING
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.slice(7, 11).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center">
            <Link
              href="/shop?type=top-selling"
              className="mt-8 flex flex-col items-center"
            >
              <button className="bg-white cursor-pointer text-black border border-black px-6 py-2 rounded-full hover:bg-gray-100 transition text-sm sm:text-base">
                View All
              </button>
            </Link>
            <hr className="mt-6 w-full opacity-30 border-t border-gray-400" />
          </div>
        </section>

        
        <section className="mt-16">
          <h2 className="text-3xl font-extrabold mb-6 text-center">
            FEATURED PRODUCTS
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.slice(2, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center">
            <Link href="/shop" className="mt-8 flex flex-col items-center">
              <button className="bg-white text-black border cursor-pointer border-black px-6 py-2 rounded-full hover:bg-gray-100 transition text-sm sm:text-base">
                View All
              </button>
            </Link>
            <hr className="mt-6 w-full opacity-30 border-t border-gray-400" />
          </div>
        </section>

        <section className="bg-gray-100 px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 rounded-2xl">
          <h2 className="text-xl md:text-2xl font-extrabold mb-6 text-center text-gray-800 tracking-widest uppercase">
            Browse by Dress Style
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-[auto_auto] gap-5 max-w-4xl mx-auto">
            {dressStyles.map((style, index) => (
              <Link
                href={style.href}
                key={style.name}
                className={`block group ${index === 2 ? "sm:col-span-2" : ""}`}
              >
                <div className="relative aspect-[2/1] sm:aspect-[4/2] bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 group-hover:shadow-lg">
                  <h3 className="absolute top-4 left-4 z-10 font-semibold text-lg text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                    {style.name}
                  </h3>
                  <Image
                    src={style.imgSrc}
                    alt={style.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
