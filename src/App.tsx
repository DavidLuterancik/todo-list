import React from 'react'

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
    return <RouterProvider router={router} />
}

export default App
