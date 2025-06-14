"use client";

import Image from "next/image";
import { Product } from "@/utils/product";
import { Star, Heart } from "lucide-react";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            size={14}
            className="text-yellow-400 fill-yellow-400"
          />
        ))}
        {halfStar && (
          <Star
            size={14}
            className="text-yellow-400 fill-yellow-400"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={14} className="text-gray-300" />
        ))}
      </div>
    );
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer w-full max-w-sm mx-auto relative">
        <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden mb-3 group">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          <button className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1 rounded-full hover:bg-white transition-opacity opacity-0 group-hover:opacity-100">
            <Heart size={18} className="text-gray-600 hover:text-red-500" />
          </button>
        </div>

        <h3 className="text-base font-medium text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.brand}</p>

        {product.rating && (
          <div className="flex items-center gap-1 mt-1">
            {renderStars(product.rating)}
            {product.reviewCount !== undefined && (
              <span className="text-xs text-gray-500">
                ({product.reviewCount})
              </span>
            )}
          </div>
        )}

        <div className="mt-1 flex items-center gap-2">
          <p className="text-lg font-semibold text-gray-900">
            ₹{product.price}
          </p>
        </div>

        {product.color && product.color.length > 0 && (
          <div className="mt-2 flex items-center gap-1 flex-wrap">
            {product.color.map((color, index) => (
              <span
                key={index}
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
