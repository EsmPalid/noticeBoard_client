import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
    endpoints: (builder) => ({
        getCategory: builder.query({
            query: () => `/createArticleProcess`,
        }),
    }),
});
