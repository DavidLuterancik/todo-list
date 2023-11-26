import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { SnackbarObject, Sorter, TodoQuery } from '../../types/types'

interface appState {
    isDarkMode: boolean
    lang: string
    snackbar: SnackbarObject
    filters: TodoQuery
}

const initialState: appState = {
    isDarkMode: false,
    lang: 'en',
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
        setDarkMode: (state: appState, action: PayloadAction<boolean>) => {
            state.isDarkMode = action.payload
        },
        setLang: (state: appState, action: PayloadAction<string>) => {
            state.lang = action.payload
        },
    },
})

export default AppSlice.reducer
export const { setFilters, setShowSnackbar, setDarkMode, setLang } = AppSlice.actions
