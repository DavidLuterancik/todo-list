import React, { useEffect, useMemo } from 'react'

import Layout from './containers/layout.tsx'
import ToDoLists from './pages/todoLists/todoLists.tsx'
import ToDoPage from './pages/todo/todoPage.tsx'
import NotFoundPage from './notFoundPage'

import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom'
import About from './pages/about.tsx'
import CreateToDoPage from './pages/todo/createTodoPage.tsx'
// import { skSK } from '@mui/material/locale'
import {
    CssBaseline,
    ThemeProvider,
    createTheme,
    useMediaQuery,
} from '@mui/material'
import { useAppSelector } from './store.ts'
import { useDispatch } from 'react-redux'
import { setDarkMode } from './store/features/appSlice.ts'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<ToDoLists />} />
            <Route path="todo/new" element={<CreateToDoPage />} />
            <Route path="todo/:id" element={<ToDoPage />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NotFoundPage />} />
        </Route>
    )
)

function App() {
    const dispatch = useDispatch()
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const isDarkMode = useAppSelector((state) => state.appState.isDarkMode)

    useEffect(() => {
        dispatch(setDarkMode(prefersDarkMode))
    }, [dispatch, prefersDarkMode])

    const theme = useMemo(
        () =>
            createTheme(
                {
                    palette: {
                        mode: isDarkMode ? 'dark' : 'light',
                    },
                }
                // skSK locale
            ),
        [isDarkMode]
    )

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <RouterProvider router={router} />
            </CssBaseline>
        </ThemeProvider>
    )
}

export default App
