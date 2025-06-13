import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function SportCategoryPage() {
  const sportProducts = products.filter(
    (product) => product.style?.toLowerCase() === "sport"
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Sport Products</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sportProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
