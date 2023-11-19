import React, { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
    useDeleteTodoMutation,
    useGetTodoQuery,
    usePostTodoMutation,
    usePutTodoMutation,
} from '../../store/services/toDoLists'
import {
    Button,
    Checkbox,
    Container,
    Divider,
    FormControl,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemIcon,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { ItemStatus, Todo } from '../../types/types'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import {
    Add,
    ArrowBack,
    Delete,
    DeleteOutline,
    Save,
} from '@mui/icons-material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import { TodoSchema } from '../../schemas/itemSchema'
import {
    Controller,
    FormProvider,
    SubmitHandler,
    useFieldArray,
    useForm,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ToDoSkeleton from '../../components/todo/todo.skeleton'
import Empty from '../../components/empty/empty'
import { useDispatch } from 'react-redux'
import { setShowSnackbar } from '../../store/features/appSlice'
import { Edit } from '@mui/icons-material'
import { v4 as uuidv4 } from 'uuid'

function shouldRenderItem(checked, itemStatus) {
    if (!checked && itemStatus === ItemStatus.Active) {
        return true
    } else if (checked && itemStatus === ItemStatus.Completed) {
        return true
    } else if (itemStatus === ItemStatus.All) {
        return true
    }

    return false
}

function initItem() {
    return {
        id: uuidv4(),
        name: '',
        checked: false,
        deadline: null,
    }
}

function ToDoPage() {
    const { id: idParam } = useParams()

    const [itemStatus, setItemStatus] = useState<ItemStatus>(ItemStatus.All)

    const { data: todo, error, isFetching } = useGetTodoQuery(idParam as string)

    const methods = useForm<Todo>({
        defaultValues: {
            id: todo?.id || undefined,
            title: todo?.title || '',
            items: todo?.items || [],
            date: moment(todo?.date).toISOString(),
        },
        resolver: zodResolver(TodoSchema),
        mode: 'all',
    })

    const {
        control,
        handleSubmit,
        // formState: { isValid, isSubmitted, isSubmitting, errors },
        watch,
    } = methods

    const onSubmit: SubmitHandler<Todo> = (data) => {
        const id = todo?.id
        id ? handleEdit(Object.assign(data, { id })) : handleSave(data)
    }

    const [putTodo] = usePutTodoMutation()
    const [postTodo] = usePostTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleEdit(data) {
        putTodo(data)
            .unwrap()
            .then(() => {
                dispatch(
                    setShowSnackbar({
                        show: true,
                        type: 'success',
                        text: `Edited ToDo: ${todo?.title}`,
                    })
                )
                navigate('/todos')
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

    function handleSave(data) {
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
                navigate(`/todos`)
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

    function handleDelete() {
        const id = todo?.id
        if (id) {
            deleteTodo(id)
                .unwrap()
                .then(() => {
                    dispatch(
                        setShowSnackbar({
                            show: true,
                            type: 'info',
                            text: `Deleted ToDo: ${todo?.title}`,
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
            navigate('/todos')
        }
    }

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items',
    })

    if (isFetching) {
        return (
            <Container maxWidth="sm">
                <ToDoSkeleton />
            </Container>
        )
    }

    return (
        <Container maxWidth="sm">
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <FormProvider {...methods}>
                    <form>
                        <Paper
                            sx={{
                                p: 2,
                                pb: 4,
                                mb: 2,
                            }}
                        >
                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{
                                    mb: 2,
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    component={Link}
                                    to={'/todos'}
                                    startIcon={<ArrowBack />}
                                >
                                    Back
                                </Button>

                                <Divider orientation="vertical" flexItem />

                                <FormControl
                                    sx={{
                                        width: 128,
                                    }}
                                >
                                    <InputLabel id="item-select-label">
                                        Item status
                                    </InputLabel>
                                    <Select
                                        labelId="item-select-label"
                                        id="item-select"
                                        value={itemStatus}
                                        onChange={(e) =>
                                            setItemStatus(
                                                e.target.value as ItemStatus
                                            )
                                        }
                                        style={{
                                            background: 'white',
                                        }}
                                    >
                                        {Object.values(ItemStatus).map(
                                            (status) => (
                                                <MenuItem
                                                    key={status}
                                                    value={status}
                                                >
                                                    {status}
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>
                                </FormControl>
                            </Stack>

                            <Stack direction={'column'} spacing={2}>
                                <Typography variant="h6">{'ToDo'}</Typography>
                                <Controller
                                    name={'title'}
                                    control={control}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            key={'title'}
                                            label={'Title'}
                                            helperText={error && error.message}
                                            error={!!error}
                                            onChange={onChange}
                                            value={value}
                                            fullWidth
                                        />
                                    )}
                                />

                                <Controller
                                    name={`date`}
                                    control={control}
                                    render={({
                                        field: {
                                            onChange,
                                            onBlur,
                                            name,
                                            value,
                                        },
                                        fieldState,
                                    }) => (
                                        <DatePicker
                                            key={`date`}
                                            label="Date"
                                            value={value && moment(value)}
                                            onChange={onChange}
                                            fullWidth
                                            slotProps={{
                                                textField: {
                                                    required: true,
                                                    clearable: true,
                                                    onBlur,
                                                    name,
                                                    error: !!fieldState?.error,
                                                    helperText:
                                                        fieldState?.error
                                                            ?.message,
                                                },
                                            }}
                                        />
                                    )}
                                />
                                <Typography variant="h6">{'Items'}</Typography>
                            </Stack>

                            <List disablePadding sx={{ mb: 4 }}>
                                {fields.length === 0 && <Empty />}
                                {fields.map((item, index) => {
                                    // if (
                                    //     !shouldRenderItem(
                                    //         item.checked,
                                    //         itemStatus
                                    //     )
                                    // ) {
                                    //     return <></>
                                    // }

                                    return (
                                        <div className="relative">
                                            <ListItem
                                                dense
                                                alignItems="flex-start"
                                            >
                                                <ListItemIcon>
                                                    <Controller
                                                        name={`items.${index}.checked`}
                                                        control={control}
                                                        defaultValue={false}
                                                        render={({
                                                            field: {
                                                                onChange,
                                                                value,
                                                            },
                                                        }) => (
                                                            <Checkbox
                                                                key={`${item.id}.checked`}
                                                                checked={value}
                                                                onChange={
                                                                    onChange
                                                                }
                                                            />
                                                        )}
                                                    />
                                                </ListItemIcon>

                                                <Controller
                                                    name={`items.${index}.name`}
                                                    control={control}
                                                    render={({
                                                        field: {
                                                            onChange,
                                                            value,
                                                        },
                                                        fieldState: { error },
                                                    }) => (
                                                        <TextField
                                                            required
                                                            key={`${item.id}.name`}
                                                            label={'Name'}
                                                            helperText={
                                                                error &&
                                                                error.message
                                                            }
                                                            error={!!error}
                                                            onChange={onChange}
                                                            value={value}
                                                            sx={{
                                                                width: '50%',
                                                                mr: 1,
                                                            }}
                                                        />
                                                    )}
                                                />

                                                <Controller
                                                    name={`items.${index}.deadline`}
                                                    control={control}
                                                    render={({
                                                        field: {
                                                            onChange,
                                                            onBlur,
                                                            name,
                                                            value,
                                                        },
                                                        fieldState,
                                                    }) => (
                                                        <DatePicker
                                                            key={`${item.id}.deadline`}
                                                            label="Deadline"
                                                            value={
                                                                value &&
                                                                moment(value)
                                                            }
                                                            onChange={onChange}
                                                            sx={{
                                                                width: '50%',
                                                            }}
                                                            slotProps={{
                                                                textField: {
                                                                    clearable:
                                                                        true,
                                                                    onBlur,
                                                                    name,
                                                                    error: !!fieldState?.error,
                                                                    helperText:
                                                                        fieldState
                                                                            ?.error
                                                                            ?.message,
                                                                },
                                                            }}
                                                        />
                                                    )}
                                                />
                                                <ListItemIcon
                                                    sx={{
                                                        justifyContent:
                                                            'flex-end',
                                                    }}
                                                >
                                                    <IconButton
                                                        edge={'end'}
                                                        onClick={() =>
                                                            remove(index)
                                                        }
                                                    >
                                                        <DeleteOutline />
                                                    </IconButton>
                                                </ListItemIcon>
                                            </ListItem>
                                        </div>
                                    )
                                })}
                            </List>

                            <Button
                                variant="outlined"
                                onClick={() => {
                                    append(initItem())
                                }}
                                endIcon={<Add />}
                                fullWidth
                            >
                                Add Item
                            </Button>
                        </Paper>

                        <Stack direction={'row'} spacing={2}>
                            {todo?.id ? (
                                <Button
                                    variant="contained"
                                    size="large"
                                    endIcon={<Edit />}
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    {'Edit'}
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    size="large"
                                    endIcon={<Save />}
                                    onClick={handleSubmit(onSubmit)}
                                    type="submit"
                                >
                                    {'Save'}
                                </Button>
                            )}

                            {todo?.id && (
                                <Button
                                    variant="outlined"
                                    size="large"
                                    endIcon={<Delete />}
                                    onClick={() => handleDelete()}
                                >
                                    {'Delete'}
                                </Button>
                            )}
                        </Stack>
                    </form>
                </FormProvider>
            </LocalizationProvider>
            <pre>{JSON.stringify(watch(), null, 2)}</pre>
        </Container>
    )
}

export default ToDoPage
