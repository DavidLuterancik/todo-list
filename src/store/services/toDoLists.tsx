import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const toDoListsApi = createApi({
    reducerPath: 'formApi',
    baseQuery: fetchBaseQuery({ baseUrl: `localhost:3004` }),
    tagTypes: ['Form'],
    endpoints: (builder) => ({
        postForm: builder.mutation<void, any>({
            query: (data) => ({
                url: '/api/v1/email',
                method: 'POST',
                body: data,
                headers: {
                    Authorization: 'Bearer YourAccessToken',
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['Form'],
        }),
    }),
})

export const { usePostFormMutation } = toDoListsApi
