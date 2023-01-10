import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    token: localStorage.getItem("jwtToken"),
    userId: localStorage.getItem("userId"),
    isLoggedIn: localStorage.getItem("jwtToken") ? true : false,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            let { token, userId } = action.payload;
            localStorage.setItem("userId", userId);
            localStorage.setItem("jwtToken", token);
            state.token = token;
            state.user = userId;
            state.isLoggedIn = true;
        },
        logout: (state, action) => {
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("userId");
            state.isLoggedIn = false;
        },
    },
});
const { actions, reducer } = authSlice;
export const { login, logout } = actions;

export default reducer;
