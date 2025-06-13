// components/SearchResultsClient.tsx
'use client';

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { products as allProducts } from "@/data/products";
import type { Product } from "@/utils/product";
import Link from "next/link";
import Image from "next/image";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import Rating from "@mui/material/Rating";
import { toast } from "react-hot-toast";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion';

export default function SearchResultsClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";
  const categoryParam = searchParams.get("category") || "All";
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [popupProduct, setPopupProduct] = useState<Product | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const categories = useMemo(() => Array.from(new Set(allProducts.map(p => p.category))), []);

  const matchingProducts = useMemo(() => {
    return allProducts.filter((product) =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  }, [query]);

  const filteredProducts = useMemo(() => {
    return matchingProducts.filter((product) => {
      const matchesCategory =
        categoryParam === "All" || product.category.toLowerCase() === categoryParam.toLowerCase();
      const matchesFilters =
        selectedFilters.length === 0 || selectedFilters.includes(product.category);
      return matchesCategory && matchesFilters;
    });
  }, [matchingProducts, categoryParam, selectedFilters]);

  const handleFilterChange = (cat: string) => {
    setSelectedFilters((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleAddToCart = (product: Product) => {
    setPopupProduct(product);
  };

  const confirmAddToCart = () => {
    if (popupProduct) {
      dispatch(
        addToCart({
          id: popupProduct.id,
          name: popupProduct.name,
          price: popupProduct.price,
          image: popupProduct.image,
          size: Array.isArray(popupProduct.size) ? popupProduct.size[0] : popupProduct.size,
          quantity: 1,
        })
      );
      toast.success("Successfully added to cart!");
      setPopupProduct(null);
    }
  };

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <main className="px-4 md:px-8 py-6">
      <p className="text-sm text-gray-600 mb-4">
        Showing 1–{filteredProducts.length} of {matchingProducts.length} results for
        <span className="font-semibold"> &quot;{query}&quot;</span>
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        <aside className="md:w-1/4">
          <h2 className="text-lg font-semibold mb-3">Filter by Category</h2>
          <div className="space-y-2">
            {categories.map((cat) => (
              <FormControlLabel
                key={cat}
                control={
                  <Checkbox
                    checked={selectedFilters.includes(cat)}
                    onChange={() => handleFilterChange(cat)}
                    size="small"
                  />
                }
                label={capitalize(cat)}
              />
            ))}
          </div>
        </aside>

        <section className="md:w-3/4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.length === 0 ? (
            <p className="col-span-full text-gray-500">No products found.</p>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border p-2 rounded-lg hover:shadow-md transition relative flex flex-col justify-between"
              >
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover rounded"
                  />
                  <div className="mt-2 text-sm">
                    <h3 className="font-medium truncate">{product.name}</h3>
                    <p className="text-gray-500">{capitalize(product.category)}</p>
                    <p className="font-semibold text-black mt-1">₹{product.price}</p>
                  </div>
                </Link>
                <Button
                  variant="contained"
                  size="small"
                  className="!mt-2 !bg-black !text-white !rounded-full"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </div>
            ))
          )}
        </section>
      </div>

      <Dialog
        open={!!popupProduct}
        onClose={() => setPopupProduct(null)}
        fullWidth
        maxWidth="sm"
        className="rounded-xl"
        PaperProps={{
          className: "bg-gradient-to-b from-gray-50 to-white shadow-xl"
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogTitle className="text-lg font-bold text-center py-4 bg-gradient-to-r from-black to-gray-800 text-white">
            ADD TO CART
            <p className="text-xs font-normal mt-1 opacity-80">Review your item before adding</p>
          </DialogTitle>

          {popupProduct && (
            <DialogContent className="p-6">
              <div className="mt-4 flex flex-col sm:flex-row gap-6 items-start">
                <div className="relative w-full sm:w-1/3 aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-md">
                  <Image
                    src={popupProduct.image}
                    alt={popupProduct.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, 33vw"
                    priority
                  />
                </div>
                <div className="sm:w-2/3 space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{popupProduct.name}</h3>
                    <div className="flex items-center mt-1 space-x-2">
                      <Rating
                        value={popupProduct.rating || 4}
                        readOnly
                        size="medium"
                        className="text-yellow-500"
                      />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-green-600">₹{popupProduct.price.toLocaleString()}</p>
                  <div className="py-3 border-y border-gray-200">
                    <p className="text-sm text-gray-700">{popupProduct.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {popupProduct.size && (
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600 mr-2">Size:</span>
                        <span className="text-sm font-medium">
                          {Array.isArray(popupProduct.size)
                            ? popupProduct.size.join(", ")
                            : popupProduct.size}
                        </span>
                      </div>
                    )}
                  </div>
                  <Link
                    href={`/products/${popupProduct.id}`}
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors mt-2"
                  >
                    View full product details
                    <ArrowForwardIcon className="ml-1.5" fontSize="small" />
                  </Link>
                </div>
              </div>
            </DialogContent>
          )}

          <DialogActions className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
            <Button
              onClick={() => {
                setPopupProduct(null);
                router.push("/shop");
              }}
              variant="outlined"
              className="!text-gray-700 !border-gray-300 hover:!bg-gray-100 !rounded-lg !px-6 !py-2 !normal-case"
            >
              Continue Shopping
            </Button>
            <Button
              onClick={confirmAddToCart}
              variant="contained"
              className="!bg-black !text-white !rounded-lg !px-6 !py-2 hover:!bg-gray-800 transition-colors shadow-md"
              startIcon={<ShoppingCartIcon />}
            >
              Add to Cart
            </Button>
          </DialogActions>
        </motion.div>
      </Dialog>
    </main>
  );
}
