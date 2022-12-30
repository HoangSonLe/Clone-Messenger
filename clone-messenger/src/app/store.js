import { configureStore } from "@reduxjs/toolkit";
import chatGroupSlice from "../features/ChatGroup/ChatGroupSlice";

const store = configureStore({
    reducer :{
        chatGroup : chatGroupSlice
    }
});

export default store;