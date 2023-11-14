import { configureStore } from '@reduxjs/toolkit'
import { AppSlice } from './store/features/appSlice'

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { toDoListsApi } from './store/services/toDoLists'

export const store = configureStore({
    reducer: {
        appState: AppSlice.reducer,
        [toDoListsApi.reducerPath]: toDoListsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(toDoListsApi.middleware),
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<
    ReturnType<typeof store.getState>
> = useSelector

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
