import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    token: localStorage.getItem("jwtToken"),
    userId: localStorage.getItem("userId"),
    displayUserName: localStorage.getItem("displayUserName"),
    isLoggedIn: localStorage.getItem("jwtToken") ? true : false,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            debugger
            let { token, userId, displayName } = action.payload;
            localStorage.setItem("userId", userId);
            localStorage.setItem("displayUserName", displayName);
            localStorage.setItem("jwtToken", token);
            state.token = token;
            state.userId = userId;
            state.displayUserName = displayName;
            state.isLoggedIn = true;
        },
        logout: (state, action) => {
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("userId");
            localStorage.removeItem("displayUserName");
            state.isLoggedIn = false;
        },
    },
});
const { actions, reducer } = authSlice;
export const { login, logout } = actions;

export default reducer;
