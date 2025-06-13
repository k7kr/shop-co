import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Star, StarHalf, Check } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    rating: 5,
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I’ve bought has exceeded my expectations.",
  },
  {
    name: "Alex K.",
    rating: 4.5,
    text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co.",
  },
  {
    name: "James L.",
    rating: 5,
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co.",
  },
  {
    name: "Emily R.",
    rating: 5,
    text: "Absolutely love the curated styles. Super easy to shop and everything fits perfectly.",
  },
  {
    name: "Daniel W.",
    rating: 4,
    text: "Good experience overall. Would appreciate more options in larger sizes.",
  },
  {
    name: "Lisa B.",
    rating: 4.5,
    text: "Fast delivery and great quality. Already planning my next order!",
  },
];

const CustomerTestimonials = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;

  const prev = () => {
    setStartIndex((prevIndex) =>
      prevIndex - visibleCount < 0
        ? Math.max(testimonials.length - visibleCount, 0)
        : prevIndex - visibleCount
    );
  };

  const next = () => {
    setStartIndex((prevIndex) =>
      prevIndex + visibleCount >= testimonials.length
        ? 0
        : prevIndex + visibleCount
    );
  };

  const visibleTestimonials = testimonials.slice(
    startIndex,
    startIndex + visibleCount
  );

  return (
    <section className="bg-white py-10 px-4 md:px-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          OUR HAPPY CUSTOMERS
        </h2>
        <div className="flex gap-2">
          <button
            onClick={prev}
            className="p-2 rounded-full border hover:bg-gray-100"
          >
            <IoMdArrowBack size={20} />
          </button>
          <button
            onClick={next}
            className="p-2 rounded-full border hover:bg-gray-100 transform rotate-180"
          >
            <IoMdArrowBack size={20} />
          </button>
        </div>
      </div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {visibleTestimonials.map((t, index) => (
          <div
            key={index}
            className="p-6 border rounded-xl shadow-sm bg-white h-full"
          >
            <div className="flex items-center gap-1 mb-2 text-yellow-500">
              {[...Array(Math.floor(t.rating))].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" stroke="none" />
              ))}
              {t.rating % 1 !== 0 && (
                <StarHalf size={16} fill="currentColor" stroke="none" />
              )}
            </div>
            <p className="font-semibold mb-2 flex items-center gap-1">
              {t.name} <Check className="text-green-500" size={16} />
            </p>
            <p className="text-gray-600 text-sm">{t.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerTestimonials;
