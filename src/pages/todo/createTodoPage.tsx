import React from 'react'

import { usePostTodoMutation } from '../../store/services/toDoLists'

import { Todo } from '../../types/types'
;('../../schemas/itemSchema')
import { SubmitHandler } from 'react-hook-form'
import { setShowSnackbar } from '../../store/features/appSlice'
import ToDoForm from '../../components/todo/todoForm'
import { useToDoPage } from './todoPage.hooks'

function CreateToDoPage() {
    const [postTodo] = usePostTodoMutation()

    const { navigate, dispatch } = useToDoPage()

    const onSubmitSave: SubmitHandler<Todo> = (data) => {
        postTodo(data)
            .unwrap()
            .then((todo: Todo) => {
                dispatch(
                    setShowSnackbar({
                        show: true,
                        type: 'success',
                        text: `Created new ToDo: ${todo?.title}`,
                    })
                )
                navigate(`/`)
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

    return <ToDoForm isEdit={false} onSubmitSave={onSubmitSave} />
}

export default CreateToDoPage
