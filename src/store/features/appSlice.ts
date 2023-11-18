import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
    SnackbarObject,
    Sorter,
    TodoQuery,
} from '../../types/types'

interface appState {
    snackbar: SnackbarObject
    filters: TodoQuery
}

const initialState: appState = {
    snackbar: {
        show: false,
    },
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
        setShowSnackbar: (
            state: appState,
            action: PayloadAction<SnackbarObject>
        ) => {
            state.snackbar = action.payload
        },
    },
})

export default AppSlice.reducer
export const { setFilters, setShowSnackbar } = AppSlice.actions
