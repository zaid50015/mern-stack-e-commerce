import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
 import{createOrder} from './orderAPI'

const initialState = {
  orders: [],
  status: 'idle',
};


export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (amount) => {
    const response = await createOrder(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,

  reducers: {
    createOrder: (state) => {

      // state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
      });
  },
});



// export const selectCount = (state) => state.order.orders;


export default orderSlice.reducer;
