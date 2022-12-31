import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    defaultModel: {},
};

const pageDefaultSlice = createSlice({
    name: "pageDefaultModel",
    initialState: initialState,
    reducers: {
        setPageDefaultModel: (state, action) => {
            state.defaultModel = action.payload;
        },
    },
});
const { actions, reducer } = pageDefaultSlice;
export const { setPageDefaultModel } = actions;

export default reducer;
