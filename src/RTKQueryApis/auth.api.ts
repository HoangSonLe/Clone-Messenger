import { baseRTKApi } from "./base.api";

export const authApi = baseRTKApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: (params) => ({
                url: "user/login",
                method: "post",
                body: { ...params },
            }),
            transformResponse(baseQueryReturnValue, meta, arg) {
                console.log(baseQueryReturnValue)
                return baseQueryReturnValue;
            },
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
        register: build.mutation({
            query: (params) => ({
                url: "user/register",
                method: "post",
                body: { ...params },
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
        logout: build.query({
            query: (params) => ({
                url: "user/logout",
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
export const { useLoginMutation, useLogoutQuery, useRegisterMutation } = authApi;
