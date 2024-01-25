import { createSlice } from "@reduxjs/toolkit";

// helpers
import { sumProducts } from "../../helper/helper.js";

const initialState = {
  selectedItems: [],
  itemsCounter: 0,
  total: 0,
  checkout: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      if (!state.selectedItems.find((item) => item.id === action.payload.id)) {
        state.selectedItems.push({ ...action.payload, quantity: 1 });
        const { itemsCounter, total } = sumProducts(state.selectedItems);
        state.itemsCounter = itemsCounter;
        state.total = total;
        state.checkout = false;
      }
    },
    removeItem: (state, action) => {
      const newSelectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.selectedItems = newSelectedItems;
      const { itemsCounter, total } = sumProducts(state.selectedItems);
      state.itemsCounter = itemsCounter;
      state.total = total;
    },
    increment: (state, action) => {
      const increaseIndex = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItems[increaseIndex].quantity++;
      const { itemsCounter, total } = sumProducts(state.selectedItems);
      state.itemsCounter = itemsCounter;
      state.total = total;
    },
    decrement: (state, action) => {
      const decreaseIndex = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItems[decreaseIndex].quantity--;
      const { itemsCounter, total } = sumProducts(state.selectedItems);
      state.itemsCounter = itemsCounter;
      state.total = total;
    },
    checkout: (state) => {
      state.selectedItems = [];
      state.itemsCounter = 0;
      state.total = 0;
      state.checkout = true;
    },
  },
});

export default cartSlice.reducer;
export const { addItem, removeItem, increment, decrement, checkout } =
  cartSlice.actions;
