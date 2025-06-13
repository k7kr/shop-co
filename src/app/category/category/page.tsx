"use client";

import { useParams } from "next/navigation";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function CategoryPage() {
  const { category } = useParams();
  const filtered = products.filter(
    (p) => p.category.toLowerCase() === category
  );

  return (
    <>
      <Navbar />

      <div className="p-6">
        <h1 className="text-2xl md:text-3xl font-bold capitalize mb-2">
          {category}
        </h1>
        <p className="text-gray-600 mb-4">
          Showing {filtered.length} {category} products
        </p>

        {filtered.length === 0 ? (
          <div className="text-red-500 text-center font-semibold mt-10">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="border rounded-lg p-3 hover:shadow-md transition"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded"
                />
                <h3 className="mt-2 font-semibold text-sm line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">₹{product.price}</p>
                <p className="text-sm text-yellow-500">
                  ⭐ {product.rating} ({product.reviewCount})
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
