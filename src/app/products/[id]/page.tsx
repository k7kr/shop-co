"use client";

import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { addToCart } from "@/redux/slices/cartSlice";
import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = useSelector((state: RootState) =>
    state.products.allProducts.find((p) => p.id === id)
  );
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [activeTab, setActiveTab] = useState("details");
  const [reviews, setReviews] = useState<
    { name: string; content: string; date: string }[]
  >([]);
  const [newReview, setNewReview] = useState("");

  if (!product) return <div className="p-6 text-center">Product not found</div>;

  const handleAddToCart = () => {
    if (!selectedSize) return toast.error("Please select a size");
    dispatch(addToCart({ ...product, quantity, size: selectedSize }));
    toast.success(`${quantity} item(s) added to cart`);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={18} className="text-yellow-400 fill-yellow-400" />
        ))}
        {halfStar && (
          <Star
            size={18}
            className="text-yellow-400 fill-yellow-400"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={18} className="text-gray-300" />
        ))}
      </div>
    );
  };

  const handleReviewSubmit = () => {
    if (!newReview.trim()) return;
    setReviews([
      { name: "You", content: newReview.trim(), date: new Date().toLocaleDateString() },
      ...reviews,
    ]);
    setNewReview("");
    toast.success("Review submitted!");
  };

  return (
    <>
      <Navbar />
      <div className="p-4 md:p-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <div className="flex flex-col gap-4">
              {[product.image, ...(product.images || [])].map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt={`thumb-${i}`}
                  width={80}
                  height={80}
                  className={`cursor-pointer border rounded ${
                    selectedImage === img ? "border-black" : ""
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
            <div className="relative w-full max-w-[500px] aspect-square border rounded overflow-hidden">
              <Image
                src={selectedImage || product.image}
                alt={product.name}
                fill
                className="object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold mb-2">
              {product.name.toUpperCase()}
            </h1>
            <p className="text-gray-500 text-sm mb-4">{product.brand}</p>
            <div className="flex items-center gap-2 mb-2">
              {renderStars(product.rating || 0)}
              <span className="text-sm text-gray-600">({product.reviewCount})</span>
            </div>
            <p className="text-2xl font-bold text-green-700 mb-4">₹{product.price}</p>
            <p className="text-sm mb-4 text-gray-700">{product.description}</p>

            {Array.isArray(product.size) && product.size.length > 0 && (
  <div className="mb-4">
    <span className="block mb-1 font-medium">Choose Size:</span>
    <div className="flex gap-2 flex-wrap">
      {product.size.map((s: string) => (
        <button
          key={s}
          onClick={() => setSelectedSize(s)}
          className={`px-4 py-1 rounded border ${
            selectedSize === s ? "bg-black text-white" : "hover:border-black"
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  </div>
)}

            <div className="flex items-center gap-4 mb-4">
              <span>Quantity:</span>
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-6 py-2 rounded-full font-extrabold hover:bg-gray-900 transition shadow"
            >
              Add to Cart
            </button>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex gap-8 mb-6 border-b pb-2 text-lg font-medium">
            <button
              onClick={() => setActiveTab("details")}
              className={activeTab === "details" ? "border-b-2 border-black" : "text-gray-600"}
            >
              Product Details
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={activeTab === "reviews" ? "border-b-2 border-black" : "text-gray-600"}
            >
              Ratings & Reviews
            </button>
            <button
              onClick={() => setActiveTab("faqs")}
              className={activeTab === "faqs" ? "border-b-2 border-black" : "text-gray-600"}
            >
              FAQs
            </button>
          </div>

          {activeTab === "details" && (
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Brand:</strong> {product.brand}
              </p>
              <p>
                <strong>Style:</strong> {product.style}
              </p>
              <p>
                <strong>Colors:</strong> {product.color?.join(", ") || "Not specified"}
              </p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="mb-4">
                <textarea
                  rows={3}
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  className="w-full border p-2 rounded"
                  placeholder="Write your review..."
                ></textarea>
                <button
                  onClick={handleReviewSubmit}
                  className="bg-black text-white px-4 py-1 mt-2 rounded"
                >
                  Submit Review
                </button>
              </div>

              {reviews.length === 0 ? (
                <p className="text-gray-600">No reviews yet.</p>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {reviews.map((r, i) => (
                    <div key={i} className="border rounded p-4 bg-white shadow">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold">{r.name}</span>
                        <span className="text-sm text-gray-400">{r.date}</span>
                      </div>
                      <p className="text-gray-700 text-sm">{r.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "faqs" && (
            <div>
              <p className="text-gray-600">No FAQs available for this product.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
