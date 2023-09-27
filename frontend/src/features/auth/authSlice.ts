import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { axiosInstance } from "../../utils/axiosInstance";
import { userLoginType, userRegisterType } from "../../shared/interfaces/user";
import { privateAxiosInstance } from "../../utils/privateAxiosInstance";

export const login = createAsyncThunk(
  "auth/login",
  async (user: userLoginType, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", user);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);
export const register = createAsyncThunk(
  "auth/register",
  async (user: userRegisterType, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/register", user);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);
export const logout = createAsyncThunk(
  "auth/logout",
  async (place: null, { rejectWithValue }) => {
    try {
      const response = await privateAxiosInstance.post("/auth/logout");
      localStorage.removeItem("user");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Define a type for the slice state
export interface AuthState {
  user: any | null;
  loading: boolean;
  error: any | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.loading = false;
        state.error = null;
        // Add any fetched posts to the array
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = null;
        // Add any fetched posts to the array
      })
      .addCase(register.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.loading = false;
        state.error = null;
        // Add any fetched posts to the array
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state;

export default authSlice.reducer;
