import { useEffect, useState } from 'react'
import { useGetTodosQuery } from '../../store/services/toDoLists'
import { useAppDispatch, useAppSelector } from '../../store'
import { setFilters } from '../../store/features/appSlice'
import { Sorter } from '../../types/types'

export const useToDoLists = () => {
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

    return {
        setSearch,
        search,
        setSorter,
        sorter,
        todos,
        error,
        isFetching,
    }
}
