import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toastErrorList } from "../generals/utils";
import { addListGroup } from "../features/ChatGroupSlice";

export const groupApi = createApi({
    reducerPath: "chatGroupApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.API_URL}/chat/`,
        credentials: "same-origin",
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json; charset=utf-8");
            headers.set("Access-Control-Allow-Origin", "*");
            let token = sessionStorage.getItem("jwtToken");
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    // transformResponse: (response, meta, arg) => response.data,
    endpoints: (build) => ({
        getChatGroupList: build.mutation({
            query: (params) => ({
                url: "GetChatGroupList",
                method: "post",
                body: {...params}
            }),
            // async onQueryStarted(id, { dispatch, queryFulfilled }) {
            //     // `onStart` side-effect
            //     try {
            //         const { response } = await queryFulfilled;
            //         console.log(response);
            //         // `onSuccess` side-effect
            //         //   dispatch(addListGroup(response.data))
            //     } catch (err) {
            //         // `onError` side-effect
            //         toastErrorList(err?.response?.data);
            //     }
            // },
        }),
        getPageDefaultModel: build.query({
            query: (params) => ({
                url: "GetPageDefaultModel",
                method: "get",
            }),
            // async onQueryStarted(id, { dispatch, queryFulfilled }) {
            //     // `onStart` side-effect
            //     try {
            //         const { response } = await queryFulfilled;
            //         console.log(response);
            //         // `onSuccess` side-effect
            //         //   dispatch(addListGroup(response.data))
            //     } catch (err) {
            //         // `onError` side-effect
            //         toastErrorList(err?.response?.data);
            //     }
            // },
        }),
    }),
});
export const { useGetChatGroupListMutation,useGetPageDefaultModelQuery } = groupApi;
