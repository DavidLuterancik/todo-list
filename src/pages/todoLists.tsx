import React from 'react'
import { Link } from 'react-router-dom'

function ToDoLists() {
    return (
        <div>
            <Link to={'/todos/test'}>Test todo link</Link>
        </div>
    )
}

export default ToDoLists
