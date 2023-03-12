import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    onlineUserList: [],
};
const UserSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        getOnlineUserList: (state, action) => {
            state.onlineUserList = action.payload;
        },
    },
});
const { actions, reducer } = UserSlice;
export const { getOnlineUserList } = actions;

export default reducer;
