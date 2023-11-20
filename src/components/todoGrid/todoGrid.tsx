import { Grid } from '@mui/material'
import React from 'react'
import ToDoSkeleton from '../todo/todoCard.skeleton.tsx'
import ToDo from '../todo/todoCard'
import { ToDoGridProps } from '../../types/types'
import { randomNumber } from '../../utils'
import Empty from '../empty/empty'

export default function ToDoGrid({ error, isFetching, todos }: ToDoGridProps) {
    const length = randomNumber(1, 8)

    if (isFetching) {
        return (
            <Grid container spacing={2}>
                {Array.from(Array(length).keys()).map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <ToDoSkeleton key={index} />
                    </Grid>
                ))}
            </Grid>
        )
    }

    if (error) {
        return <Empty />
    }

    return (
        <Grid container spacing={2}>
            {todos.map((todo) => (
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <ToDo key={todo.id} todo={todo} />
                </Grid>
            ))}
        </Grid>
    )
}
