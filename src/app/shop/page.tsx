"use client";

import { useState, useEffect, useMemo } from "react";
import { products as allProducts } from "@/data/products";
import { Product } from "@/utils/product";
import Link from "next/link";
import Image from "next/image";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Black", "White"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const styles = ["Casual", "Formal", "Streetwear", "Sport", "Lounge"];
const sortOptions = ["Most Popular", "Lowest Price", "Highest Price", "Newest"];

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [filters, setFilters] = useState({
    price: [0, 2000],
    colors: [] as string[],
    sizes: [] as string[],
    styles: [] as string[],
  });
  const [sortBy, setSortBy] = useState("Most Popular");
  

  const handleCheckbox = (type: keyof typeof filters, value: string) => {
    setFilters((prev) => {
      const current = prev[type] as string[];
      const exists = current.includes(value);
      return {
        ...prev,
        [type]: exists ? current.filter((v) => v !== value) : [...current, value],
      };
    });
  };

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    if (sortBy === "Lowest Price") sorted.sort((a, b) => a.price - b.price);
    else if (sortBy === "Highest Price") sorted.sort((a, b) => b.price - a.price);
    else if (sortBy === "Newest") sorted.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    else sorted.sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));
    return sorted;
  }, [filteredProducts, sortBy]);

  useEffect(() => {
    const results = allProducts.filter((product) => {
      const priceMatch = product.price >= filters.price[0] && product.price <= filters.price[1];
      const colorMatch =
        filters.colors.length === 0 || filters.colors.some((c) => product.color?.includes(c));
      const sizeMatch =
        filters.sizes.length === 0 || filters.sizes.some((s) => product.size?.includes(s));
      const styleMatch =
        filters.styles.length === 0 || filters.styles.includes(product.style ?? "");
      return priceMatch && colorMatch && sizeMatch && styleMatch;
    });
    setFilteredProducts(results);
  }, [filters]);

  const selectedCategory = filters.styles.length === 1 ? filters.styles[0] : "Products";

  return (
    <>
      <Navbar />

      <div className="flex flex-col md:flex-row p-6 gap-6">
        <aside className="w-full md:w-1/4 bg-white rounded-xl shadow p-4 md:sticky top-24 md:h-fit overflow-x-auto md:overflow-visible flex md:block gap-6 md:gap-0 whitespace-nowrap md:whitespace-normal">
          <div className="min-w-[300px] md:min-w-0 space-y-6 shrink-0">
            <h2 className="font-bold text-lg mb-2">FILTERS</h2>

            <div>
              <h3 className="font-semibold text-sm mb-2">Price</h3>
              <Slider
                value={filters.price}
                onChange={(_, newValue) =>
                  Array.isArray(newValue) && setFilters({ ...filters, price: newValue })
                }
                valueLabelDisplay="auto"
                min={0}
                max={2000}
                step={100}
              />
              <p className="text-sm text-gray-600">
                ₹{filters.price[0]} - ₹{filters.price[1]}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-sm mb-2">Colors</h3>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <FormControlLabel
                    key={color}
                    control={
                      <Checkbox
                        checked={filters.colors.includes(color)}
                        onChange={() => handleCheckbox("colors", color)}
                      />
                    }
                    label={<span className="text-sm">{color}</span>}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-sm mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <FormControlLabel
                    key={size}
                    control={
                      <Checkbox
                        checked={filters.sizes.includes(size)}
                        onChange={() => handleCheckbox("sizes", size)}
                      />
                    }
                    label={<span className="text-sm">{size}</span>}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-sm mb-2">Dress Style</h3>
              <div className="flex flex-col gap-1">
                {styles.map((style) => (
                  <FormControlLabel
                    key={style}
                    control={
                      <Checkbox
                        checked={filters.styles.includes(style)}
                        onChange={() => handleCheckbox("styles", style)}
                      />
                    }
                    label={<span className="text-sm">{style}</span>}
                  />
                ))}
              </div>
            </div>

            <Button
              variant="contained"
              color="primary"
              className="!mt-4 !w-full !bg-black  !text-white  !rounded-full"
              onClick={() =>
                setFilters({ price: [0, 2000], colors: [], sizes: [], styles: [] })
              }
            >
              Clear All
            </Button>
          </div>
        </aside>

        <section className="w-full md:w-3/4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
            <div>
              <h1 className="text-2xl font-bold">{selectedCategory}</h1>
              <p className="text-sm text-gray-600 mt-1">
                Showing 1–{sortedProducts.length} of {sortedProducts.length} products
              </p>
            </div>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              size="small"
              className="bg-white rounded-md"
            >
              {sortOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </div>

          {sortedProducts.length === 0 ? (
            <div className="text-red-500 text-center font-semibold text-lg mt-10">
              No item found
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedProducts.map((product) => {
                const hasDiscount =
                  typeof product.originalPrice === "number" &&
                  product.originalPrice > product.price;

                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 w-full cursor-pointer relative"
                  >
                    <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden group mb-3">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {hasDiscount && product.originalPrice !== undefined && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                          -{Math.round(
                            ((product.originalPrice - product.price) / product.originalPrice) * 100
                          )}%
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-medium text-gray-900 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500">{product.brand}</p>

                    {product.rating && (
                      <p className="text-sm text-yellow-600 mt-1">
                        ⭐ {product.rating}
                        {product.reviewCount !== undefined && (
                          <span className="text-gray-500"> ({product.reviewCount})</span>
                        )}
                      </p>
                    )}

                    <div className="mt-1 flex items-center gap-2">
                      <p className="text-lg font-semibold text-gray-900">₹{product.price}</p>
                      {hasDiscount && product.originalPrice !== undefined && (
                        <p className="text-sm text-gray-400 line-through">
                          ₹{product.originalPrice}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </>
  );
}
