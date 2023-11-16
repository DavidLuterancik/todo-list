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
    id?: string
    title: string
    items: TodoItem[]
    date: string
}

export type TodoItem = {
    name: string
    checked: boolean
    deadline: string | null
}
