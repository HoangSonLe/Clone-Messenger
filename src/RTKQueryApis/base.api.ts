import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseRTKApi = createApi({
    reducerPath: "baseRTKApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.API_URL}/`,
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
    endpoints: () => ({}),
});
