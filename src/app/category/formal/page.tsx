import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function FormalPage() {
  const filtered = products.filter(
    (product) => product.style?.toLowerCase() === "formal"
  );

  return (
    <>
    <Navbar/>
    <div className="p-6">
      <h1 className="text-2xl font-extrabold mb-4 capitalize">FORMAL WEAR</h1>
      {filtered.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
}
