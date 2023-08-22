import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, deleteItemFromCart, fetchItemsByUserId, upadteCart } from "./cartAPI";

const initialState = {
  items: [],
  status: "idle",
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (cartItem) => {
    const response = await addToCart(cartItem);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  "cart/fetchItemsByUserId",
  async (userId) => {
    const response = await fetchItemsByUserId(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const upadteCartAsync = createAsyncThunk(
  "cart/upadteCart",
  async (update) => {
    const response = await upadteCart(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteItemFromCartAsync = createAsyncThunk(
  "cart/deleteItemFromCart",
  async (itemId) => {
    const response = await deleteItemFromCart(itemId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
    
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items=action.payload;
      }).addCase(upadteCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(upadteCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const findIndex=state.items.findIndex(item=>item.id===action.payload.id);
        state.items[findIndex]=action.payload;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index=state.items.findIndex(item=>item.id===action.payload.id);
        state.items.splice(index,1);
      })
  },
});

export const { increment } = cartSlice.actions;

export const selectItem = (state) => state.cart.items;

export default cartSlice.reducer;
