import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const testApi = createApi({
    reducerPath: "test",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),

    endpoints: (builder) => ({
        getContent: builder.query({
            query: (id) => `contentProcess/?id=${id}`,
            providesTags: (result, error, id) => [{ type: "Contents", id }],
        }),
        postContent: builder.mutation({
            query: (body) => ({
                url: "/content",
                method: "POST",
                body,
            }),
            invalidatesTags: (result, error, content) => [
                { type: "Contents", id: content.id },
            ],
        }),
    }),
});

export const { useGetContentQuery, useGetSupportQuery } = testApi;
