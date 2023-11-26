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
import { useTranslation } from 'react-i18next'

function ToDoPage() {
    const { t } = useTranslation()
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
                        text: `${t('edited_todo')}: ${todo?.title}`,
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
            window.confirm(`${t('confirm_delete_todo')}: ${todo?.title}`)
        ) {
            deleteTodo(todoId)
                .unwrap()
                .then(() => {
                    dispatch(
                        setShowSnackbar({
                            show: true,
                            type: 'info',
                            text: `${t('deleted_todo')}: ${todo?.title}`,
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
                <BackButton to="/" />
                <Typography variant="h5" color="textSecondary">
                    {`${t('not_found')} 😔`}
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
