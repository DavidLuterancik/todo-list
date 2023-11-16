import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Sorter, TodoQuery } from '../../types/types'

interface appState {
    filters: TodoQuery
}

const initialState: appState = {
    filters: {
        q: '',
        sorter: Sorter.Newest,
    },
}

export const AppSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        setFilters: (state: appState, action: PayloadAction<TodoQuery>) => {
            state.filters = action.payload
        },
    },
})

export default AppSlice.reducer
export const { setFilters } = AppSlice.actions
