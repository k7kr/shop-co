
import { products } from "@/data/products";
import  ProductCard  from "@/components/ProductCard";

interface PageProps {
  params: {
    style: string;
  };
}

export default function CategoryPage({ params }: PageProps) {
  const { style } = params;

  const filtered = products.filter(
    (product) => product.style?.toLowerCase() === style.toLowerCase()
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 capitalize">{style} Products</h1>
      {filtered.length === 0 ? (
        <p>No products found for this category.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
