import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkAuth, createUser, logOut, loginUser } from "./authAPI";

const initialState = {
  status: "idle",
  loggedInUser: null,
  error: null,
  userChecked:false
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      // The value we return becomes the `fulfilled` action payload

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const checkAuthAsync = createAsyncThunk(
  "auth/checkAuth",
  async () => {
    try {
      const response = await checkAuth();
      // The value we return becomes the `fulfilled` action payload

      return response.data;
    } catch (error) {
      console.log(error);
    }
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
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })

      .addCase(logOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = null;
      })
      .addCase(logOutAsync.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "rejected";
        //jab tak user nhi aa jata
        state.userChecked = true;
      });
  },
});



export const { increment } = authSlice.actions;
export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;
export default authSlice.reducer;
