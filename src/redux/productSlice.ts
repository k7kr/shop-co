import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { products as allProducts } from "@/data/products";
import { Product } from "@/utils/product";

interface Filters {
  price: [number, number];
  colors: string[];
  sizes: string[];
  styles: string[];
}

interface ProductState {
  allProducts: Product[];
  filteredProducts: Product[];
  filters: Filters;
}

const initialState: ProductState = {
  allProducts,
  filteredProducts: allProducts,
  filters: {
    price: [0, 2000],
    colors: [],
    sizes: [],
    styles: [],
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<Filters>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters(state) {
      state.filters = {
        price: [0, 2000],
        colors: [],
        sizes: [],
        styles: [],
      };
    },
    filterProductsByCriteria(state) {
      state.filteredProducts = state.allProducts.filter((product) => {
        const priceMatch = product.price >= state.filters.price[0] && product.price <= state.filters.price[1];
        const colorMatch =
          state.filters.colors.length === 0 || state.filters.colors.some((c) => product.color?.includes(c));
        const sizeMatch =
          state.filters.sizes.length === 0 || state.filters.sizes.some((s) => product.size?.includes(s));
        const styleMatch =
          state.filters.styles.length === 0 || state.filters.styles.includes(product.style ?? "");
        return priceMatch && colorMatch && sizeMatch && styleMatch;
      });
    },
  },
});

export const { setFilters, resetFilters, filterProductsByCriteria } = productSlice.actions;
export default productSlice.reducer;



