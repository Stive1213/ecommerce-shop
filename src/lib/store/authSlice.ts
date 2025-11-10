import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  user: { email: string } | null;
  isAuthenticated: boolean;
}

const userFromCookie = Cookies.get("user")
  ? JSON.parse(Cookies.get("user")!)
  : null;

const initialState: AuthState = {
  user: userFromCookie,
  isAuthenticated: !!userFromCookie,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string }>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      Cookies.set("user", JSON.stringify(action.payload), { expires: 7 });
      Cookies.set("mock-auth", "true", { expires: 7 });
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      Cookies.remove("user");
      Cookies.remove("mock-auth");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
