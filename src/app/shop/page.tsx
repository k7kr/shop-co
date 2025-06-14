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
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const colors = [
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "Purple",
  "Black",
  "White",
];
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const styles = ["Casual", "Formal", "Streetwear", "Sport", "Lounge"];
const sortOptions = ["Most Popular", "Lowest Price", "Highest Price", "Newest"];

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(allProducts);
  const [filters, setFilters] = useState({
    price: [0, 2000],
    colors: [] as string[],
    sizes: [] as string[],
    styles: [] as string[],
  });
  const [sortBy, setSortBy] = useState("Most Popular");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [tempFilters, setTempFilters] = useState(filters); // For mobile Apply button

  const handleCheckbox = (
    type: keyof typeof filters,
    value: string,
    temp = false
  ) => {
    const update = temp ? setTempFilters : setFilters;
    update((prev) => {
      const current = prev[type] as string[];
      const exists = current.includes(value);
      return {
        ...prev,
        [type]: exists
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    if (sortBy === "Lowest Price") sorted.sort((a, b) => a.price - b.price);
    else if (sortBy === "Highest Price")
      sorted.sort((a, b) => b.price - a.price);
    else if (sortBy === "Newest")
      sorted.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    else sorted.sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));
    return sorted;
  }, [filteredProducts, sortBy]);

  useEffect(() => {
    const results = allProducts.filter((product) => {
      const priceMatch =
        product.price >= filters.price[0] && product.price <= filters.price[1];
      const colorMatch =
        filters.colors.length === 0 ||
        filters.colors.some((c) => product.color?.includes(c));
      const sizeMatch =
        filters.sizes.length === 0 ||
        filters.sizes.some((s) => product.size?.includes(s));
      const styleMatch =
        filters.styles.length === 0 ||
        filters.styles.includes(product.style ?? "");
      return priceMatch && colorMatch && sizeMatch && styleMatch;
    });
    setFilteredProducts(results);
  }, [filters]);

  const selectedCategory =
    filters.styles.length === 1 ? filters.styles[0] : "PRODUCT";

  const FilterContent = ({ isMobile = false }: { isMobile?: boolean }) => {
    const localFilters = isMobile ? tempFilters : filters;
    const updateFilters = (newFilters: typeof filters) =>
      isMobile ? setTempFilters(newFilters) : setFilters(newFilters);
    const onCheckbox = (type: keyof typeof filters, value: string) =>
      handleCheckbox(type, value, isMobile);

    return (
      <div className="w-[280px] p-4 space-y-6">
        {isMobile && (
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold">Filters</h2>
            <IconButton onClick={() => setShowMobileFilters(false)}>
              <CloseIcon />
            </IconButton>
          </div>
        )}

        <div>
          <h3 className="font-semibold text-sm mb-2">Price</h3>
          <Slider
            value={localFilters.price}
            onChange={(_, newValue) =>
              Array.isArray(newValue) &&
              updateFilters({ ...localFilters, price: newValue })
            }
            valueLabelDisplay="auto"
            min={0}
            max={2000}
            step={100}
          />
          <p className="text-sm text-gray-600">
            ₹{localFilters.price[0]} - ₹{localFilters.price[1]}
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
                    checked={localFilters.colors.includes(color)}
                    onChange={() => onCheckbox("colors", color)}
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
                    checked={localFilters.sizes.includes(size)}
                    onChange={() => onCheckbox("sizes", size)}
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
                    checked={localFilters.styles.includes(style)}
                    onChange={() => onCheckbox("styles", style)}
                  />
                }
                label={<span className="text-sm">{style}</span>}
              />
            ))}
          </div>
        </div>

        {isMobile ? (
          <div className="space-y-2 pt-2">
            <Button
              variant="contained"
              fullWidth
              className="!bg-black !text-white !rounded-full"
              onClick={() => {
                setFilters(tempFilters);
                setShowMobileFilters(false);
              }}
            >
              Apply Filters
            </Button>
            <Button
              fullWidth
              onClick={() =>
                setTempFilters({
                  price: [0, 2000],
                  colors: [],
                  sizes: [],
                  styles: [],
                })
              }
            >
              Clear All
            </Button>
          </div>
        ) : (
          <Button
            variant="contained"
            color="primary"
            className="!mt-4 !w-full !bg-black !text-white !rounded-full"
            onClick={() =>
              setFilters({
                price: [0, 2000],
                colors: [],
                sizes: [],
                styles: [],
              })
            }
          >
            Clear All
          </Button>
        )}
      </div>
    );
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col md:flex-row p-6 gap-6">
        <aside className="hidden md:block md:w-[280px] bg-white rounded-xl shadow sticky top-24 h-fit">
          <FilterContent />
        </aside>

        <div className="md:hidden flex justify-end mb-4">
          <Button
            variant="outlined"
            onClick={() => setShowMobileFilters(true)}
            className="!text-black !border-gray-400"
          >
            Filters
          </Button>
        </div>

        <Drawer
          anchor="left"
          open={showMobileFilters}
          onClose={() => setShowMobileFilters(false)}
        >
          <FilterContent isMobile />
        </Drawer>

        {/* Product List */}
        <section className="w-full md:flex-1">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
            <div>
              <h1 className="text-2xl font-bold">{selectedCategory}</h1>
              <p className="text-sm text-gray-600 mt-1">
                Showing 1–{sortedProducts.length} of {sortedProducts.length}{" "}
                products
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
            <div className="text-gray-500 text-center font-semibold text-lg mt-10">
              No item found
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
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
                  </div>

                  <h3 className="text-base font-medium text-gray-900 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">{product.brand}</p>

                  {product.color && (
                    <p className="text-sm text-gray-600">
                      Color:{" "}
                      {Array.isArray(product.color)
                        ? product.color.join(", ")
                        : product.color}
                    </p>
                  )}
                  {product.rating && (
                    <p className="text-sm text-yellow-600 mt-1">
                      ⭐ {product.rating}
                      {product.reviewCount !== undefined && (
                        <span className="text-gray-500">
                          {" "}
                          ({product.reviewCount})
                        </span>
                      )}
                    </p>
                  )}

                  <div className="mt-1 flex items-center gap-2">
                    <p className="text-lg font-semibold text-gray-900">
                      ₹{product.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </>
  );
}
