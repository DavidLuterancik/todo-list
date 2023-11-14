import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface appState {}

const initialState: appState = {}

export const AppSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        test: (state: appState, action: PayloadAction<number>) => {
            state = action.payload
        },
    },
})

export default AppSlice.reducer
export const { test } = AppSlice.actions
