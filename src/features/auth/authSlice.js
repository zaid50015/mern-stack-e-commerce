import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, logOut } from "./authAPI";
import { updateUser } from "../user/userAPI";
const initialState = {
  status: "idle",
  loggedInUser: null,
  error: null,
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  "auth/checkUser",
  async (loginInfo,{rejectWithValue}) => {
    try {
      const response = await checkUser(loginInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
    } catch (error) {
      console.log(error);
     return  rejectWithValue(error)
    }
    
  }
);

export const updateUserAsync = createAsyncThunk(
  "auth/updateUser",
  async (userData) => {
    const response = await updateUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const logOutAsync = createAsyncThunk("auth/logOut", async (userId) => {
  const response = await logOut(userId);
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(logOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = null;
      })
      .addCase(logOutAsync.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});

export const { increment } = authSlice.actions;
export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;
export default authSlice.reducer;
