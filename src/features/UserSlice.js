import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../api/userApi";
const initialState = {
    onlineUserList: [],
};
export const fetchGetOnlineUserList = createAsyncThunk("user/fetchGetOnlineUserList",async ()=> {
    try {
        let response = await userApi.getOnlineUserList();
        if (response.isSuccess == true) {
            return response.data;
        }
    } catch (err) {
        console.log("err", err);
    }
});
const UserSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        getOnlineUserList: (state, action) => {
            state.onlineUserList = action.payload;
        },
        updateUser: (state, action) => {    
            let { id, isOnline } = action.payload;
            let findUserIndex = state.onlineUserList.findIndex((i) => i.id == id);
            if (findUserIndex != -1) {
                if (isOnline == false) {
                    state.onlineUserList.splice(findUserIndex, 1);
                }
            } else {
                state.onlineUserList.push(action.payload);
            }
        },
    },
    extraReducers :(builder)    => {
        builder.addCase(fetchGetOnlineUserList.fulfilled, (state, action) => {
            state.onlineUserList = action.payload;
          })
    }
});

const { actions, reducer } = UserSlice;
export const { getOnlineUserList, updateUser } = actions;

export default reducer;
