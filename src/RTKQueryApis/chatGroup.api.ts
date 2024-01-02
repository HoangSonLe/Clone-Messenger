import { baseRTKApi } from "./base.api";

export const groupApi = baseRTKApi.injectEndpoints({
    endpoints: (build) => ({
        getChatGroupList: build.mutation({
            query: (params) => ({
                url: "chat/GetChatGroupList",
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
                url: "chat/GetPageDefaultModel",
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
