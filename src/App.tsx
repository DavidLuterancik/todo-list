import React from 'react'

import Layout from './containers/layout.tsx'
import Home from './pages/home'
import ToDoLists from './pages/todoLists'
import ToDoList from './pages/todoList'
import NotFoundPage from './notFoundPage'

import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom'


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="todos" element={<ToDoLists />} />
            <Route path="todos/:id" element={<ToDoList />} />
            <Route path="*" element={<NotFoundPage />} />
        </Route>
    )
)

function App() {
    return <RouterProvider router={router} />
}

export default App
