export enum Sorter {
    Newest = 'Newest',
    Oldest = 'Oldest',
}

export type TodoQuery = {
    q: string
    category?: string
    sorter: string
}

export type Todo = {
    id?: string
    title: string
    deadline: string
    items: TodoItem[]
    date: string
}

export type TodoItem = {
    order: number
    name: string
    checked: boolean
}
