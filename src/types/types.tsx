import { SubmitHandler } from 'react-hook-form'

export enum Sorter {
    Newest = 'Newest',
    Oldest = 'Oldest',
}

export enum ItemStatus {
    All = 'All',
    Active = 'Active',
    Completed = 'Completed',
}

export type TodoQuery = {
    q: string
    sorter: string
}

export type Todo = {
    id: string
    title: string
    items: TodoItem[]
    date: string
}

export type TodoItem = {
    id: string
    name: string
    checked: boolean
    deadline: string | null
}

export type TodoProps = {
    todo: Todo
}

export type ToDoFormProps = {
    isEdit: boolean
    todo?: Todo
    onSubmitSave?: SubmitHandler<Todo> 
    onSubmitEdit?: SubmitHandler<Todo>
    onSubmitDelete?: () => void
}

export type ToDoGridProps = {
    error: boolean
    isFetching: boolean
    todos: Todo[]
}

export type SnackbarObject = {
    show: boolean
    type?: SnackbarTypes
    text?: string
}

export type SnackbarTypes = 'error' | 'success' | 'info'
