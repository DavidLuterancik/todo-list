import React from 'react'
import { useParams } from 'react-router-dom'
import {
    useDeleteTodoMutation,
    useGetTodoQuery,
    usePutTodoMutation,
} from '../../store/services/toDoLists'
import { Typography } from '@mui/material'
import { Todo } from '../../types/types'

import { SubmitHandler } from 'react-hook-form'
import ToDoSkeleton from '../../components/todo/todoCard.skeleton'
import { setShowSnackbar } from '../../store/features/appSlice'
import ToDoForm from '../../components/todo/todoForm'
import { useToDoPage } from './todoPage.hooks'
import BackButton from '../../components/backButton/backButton'

function ToDoPage() {
    const { id: idParam } = useParams()
    const { data: todo, error, isFetching } = useGetTodoQuery(idParam as string)

    const { navigate, dispatch } = useToDoPage()

    const [putTodo] = usePutTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()

    const todoId = todo?.id

    const onSubmitEdit: SubmitHandler<Todo> = (data) => {
        putTodo(Object.assign(data, { id: todoId }))
            .unwrap()
            .then(() => {
                dispatch(
                    setShowSnackbar({
                        show: true,
                        type: 'success',
                        text: `Edited Todo: ${todo?.title}`,
                    })
                )
                navigate('/')
            })
            .catch(() =>
                dispatch(
                    setShowSnackbar({
                        show: true,
                        type: 'error',
                    })
                )
            )
    }

    function onSubmitDelete() {
        if (
            todoId && 
            window.confirm(
                `Do you really want to delete this Todo: ${todo?.title}`
            )
        ) {
            deleteTodo(todoId)
                .unwrap()
                .then(() => {
                    dispatch(
                        setShowSnackbar({
                            show: true,
                            type: 'info',
                            text: `Deleted Todo: ${todo?.title}`,
                        })
                    )
                })
                .catch(() =>
                    dispatch(
                        setShowSnackbar({
                            show: true,
                            type: 'error',
                        })
                    )
                )
            navigate('/')
        }
    }

    if (isFetching) {
        return <ToDoSkeleton /> 
    }

    if (error) {
        return (
            <>
                <BackButton to='/' />
                <Typography variant="h5" color="textSecondary">
                    Todo list not found 😔
                </Typography>
            </>
        )
    }

    return (
        <ToDoForm
            isEdit={true}
            todo={todo}
            onSubmitEdit={onSubmitEdit}
            onSubmitDelete={onSubmitDelete}
        />
    )
}

export default ToDoPage