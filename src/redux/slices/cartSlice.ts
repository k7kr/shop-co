// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Product } from "@/types/product";

// interface CartItem extends Product {
//   quantity: number;
//    selectedSize?: string;
//   selectedColor?: string;
// }

// interface CartState {
//   items: CartItem[];
// }

// const initialState: CartState = {
//   items: [],
// };

// export const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action: PayloadAction<CartItem>) => {
//       const existing = state.items.find(item => item.id === action.payload.id);
//       if (existing) {
//         existing.quantity += action.payload.quantity;
//       } else {
//         state.items.push(action.payload);
//       }
//     },
//   },
// });

// export const { addToCart } = cartSlice.actions;
// export default cartSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/types/cart";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item: CartItem) => item.id !== action.payload
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find(
        (item: CartItem) => item.id === action.payload.id
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
