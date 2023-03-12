import { createSlice } from "@reduxjs/toolkit";
const tryParseLocalJSON = (key) => {
    try {
        var obj = sessionStorage.getItem(key);
        return JSON.parse(obj);
    } catch (e) {
        console.log(e); // you can get error here
    }
    return {};
};
const initialState = {
    token: sessionStorage.getItem("jwtToken"),
    currentUserId: sessionStorage.getItem("currentUserId"),
    currentUserInfor: tryParseLocalJSON("currentUserInfor"),
    isLoggedIn: sessionStorage.getItem("jwtToken") ? true : false,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            let { token, userId } = action.payload;
            sessionStorage.setItem("currentUserId", userId);
            sessionStorage.setItem("currentUserInfor", JSON.stringify(action.payload));
            sessionStorage.setItem("jwtToken", token);
            state.token = token;
            state.currentUserId = userId;
            state.currentUserInfor = action.payload;
            state.isLoggedIn = true;
        },
        logout: (state, action) => {
            sessionStorage.removeItem("jwtToken");
            sessionStorage.removeItem("currentUserId");
            sessionStorage.removeItem("currentUserInfor");
            state.isLoggedIn = false;
        },
    },
});
const { actions, reducer } = authSlice;
export const { login, logout } = actions;

export default reducer;
