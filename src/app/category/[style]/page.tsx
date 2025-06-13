import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";
import { capitalizeFirstLetter } from "@/utils/helper";

interface Props {
  params: { style: string };
}

export default function StyleCategoryPage({ params }: Props) {
  const { style } = params;

  const filteredProducts = products.filter(
    (product) => product.style.toLowerCase() === style.toLowerCase()
  );

  if (filteredProducts.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {capitalizeFirstLetter(style)} Style
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
