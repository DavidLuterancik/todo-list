import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Sorter, Todo, TodoQuery } from '../../types/types'

export const toDoListsApi = createApi({
    reducerPath: 'toDoListApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}` }),
    tagTypes: ['todos', 'todo'],
    endpoints: (builder) => ({
        getTodos: builder.query<Todo[], TodoQuery>({
            query: (params) => {
                return `/todos?${buildQuery(params)}`
            },
            providesTags: ['todos'],
        }),
        postTodo: builder.mutation<Todo, Todo>({
            query: (data) => ({
                url: '/todos',
                method: 'POST',
                body: data,
                headers: {
                    Authorization: 'Bearer YourAccessToken',
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['todos'],
        }),
        getTodo: builder.query<Todo, string>({
            query: (id) => {
                return `/todos/${id}`
            },
            providesTags: ['todo'],
        }),
        putTodo: builder.mutation<Todo, Todo>({
            query: ({ id, ...rest }) => ({
                url: `/todos/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['todo', 'todos'],
        }),
        deleteTodo: builder.mutation<void, Todo>({
            query: (id) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['todos', 'todo'],
        }),
    }),
})

function buildQuery({ q, sorter }: TodoQuery) {
    const searchParams = new URLSearchParams()

    if (q) {
        searchParams.append('q', q)
    }

    searchParams.append('_sort', 'date')
    searchParams.append('_order', sorter === Sorter.Newest ? 'desc' : 'asc')

    return searchParams.toString()
}

export const {
    useGetTodosQuery,
    usePostTodoMutation,
    useGetTodoQuery,
    usePutTodoMutation,
    useDeleteTodoMutation,
} = toDoListsApi
