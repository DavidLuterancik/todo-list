import React, { useEffect, useState } from 'react'
import { Sorter } from '../types/types'
import { useGetTodosQuery } from '../store/services/toDoLists'

function ToDoLists() {
    const [search, setSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [sorter, setSorter] = useState<Sorter>(Sorter.Newest)
    const [category, setCategory] = useState()

    const {
        data: todos,
        error,
        isFetching,
    } = useGetTodosQuery({ q: debouncedSearch, category, sorter })

    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            setDebouncedSearch(search)
        }, 500)
        return () => clearTimeout(delayInputTimeoutId)
    }, [search])

    console.log(todos)

    return (
        <div>
            {error && 'Error'}
            {isFetching && 'isFetching'}
            <pre>{JSON.stringify(todos)}</pre>
        </div>
    )
}

export default ToDoLists
