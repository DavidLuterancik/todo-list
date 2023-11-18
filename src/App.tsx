import React from 'react'

import Layout from './containers/layout.tsx'
import ToDoLists from './pages/todoLists/todoLists.tsx'
import ToDoList from './pages/todoList'
import NotFoundPage from './notFoundPage'

import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom'
import About from './pages/about.tsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index path="todos" element={<ToDoLists />} />
            <Route path="todo/:id" element={<ToDoList />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NotFoundPage />} />
        </Route>
    )
)

function App() {
    return <RouterProvider router={router} />
}

export default App
