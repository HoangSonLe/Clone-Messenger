import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    token: localStorage.getItem("jwtToken"),
    isLoggedIn: localStorage.getItem("jwtToken") ? true : false,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            localStorage.setItem("jwtToken", action.payload);
            state.token = action.payload;
            state.isLoggedIn = true;
        },
        logout: (state, action) => {
            localStorage.removeItem("jwtToken");
            state.isLoggedIn = false;
        },
    },
});
const { actions, reducer } = authSlice;
export const { login, logout } = actions;

export default reducer;
