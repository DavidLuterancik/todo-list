import React, { useEffect, useState } from 'react'
import { Sorter } from '../types/types'
import { useGetTodosQuery } from '../store/services/toDoLists'
import { Link } from 'react-router-dom'
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material'
import { setFilters } from '../store/features/appSlice'
import { useAppDispatch, useAppSelector } from '../store'

function ToDoLists() {
    const dispatch = useAppDispatch()
    const { q: searchState, sorter: sorterState } = useAppSelector(
        (state) => state.appState.filters
    )

    const [search, setSearch] = useState(searchState)
    const [debouncedSearch, setDebouncedSearch] = useState(searchState)
    const [sorter, setSorter] = useState<Sorter>(sorterState as Sorter)

    const {
        data: todos,
        error,
        isFetching,
    } = useGetTodosQuery({ q: debouncedSearch, sorter })

    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            setDebouncedSearch(search)
        }, 500)
        return () => clearTimeout(delayInputTimeoutId)
    }, [search])

    useEffect(() => {
        dispatch(
            setFilters({
                q: search,
                sorter,
            })
        )
    }, [sorter, search, dispatch])

    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="sorter-select-label">Sorter</InputLabel>
                <Select
                    labelId="sorter-select-label"
                    id="sorter-select"
                    value={sorter}
                    label="Sorter"
                    onChange={(e) => setSorter(e.target.value as Sorter)}
                    sx={{
                        background: 'white',
                    }}
                >
                    {Object.values(Sorter).map((sorter) => (
                        <MenuItem key={sorter} value={sorter}>
                            {sorter}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                id="search"
                label="Search"
                value={search}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setSearch(event.target.value)
                }}
                fullWidth
                sx={{
                    background: 'white',
                }}
            />

            <Link to={`/todo/new`}>
                <Button>Create new</Button>
            </Link>
            {error && 'Error'}
            {isFetching && 'isFetching'}
            {todos?.map((t, index) => {
                return <Link key={index} to={`/todo/${t.id}`}>{t.title}</Link>
            })}
        </div>
    )
}

export default ToDoLists
